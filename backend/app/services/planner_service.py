from datetime import datetime
from itertools import permutations


# ---------------------------------------------------------
# TIME HELPERS
# ---------------------------------------------------------

def time_to_minutes(value: str) -> int:
    hour, minute = map(int, value.split(":"))
    return hour * 60 + minute


def minutes_to_time(value: int) -> str:
    hour = value // 60
    minute = value % 60
    return f"{hour:02d}:{minute:02d}"


# ---------------------------------------------------------
# WEATHER SCORES
# ---------------------------------------------------------

def temperature_score(temperature: float) -> float:
    """
    0-100

    Najprijatnije je oko 20-24°C.
    Ne želimo ni ekstremnu vrućinu ni hladnoću.
    """

    ideal_min = 20
    ideal_max = 24

    if ideal_min <= temperature <= ideal_max:
        return 100

    if temperature < ideal_min:
        difference = ideal_min - temperature
    else:
        difference = temperature - ideal_max

    score = 100 - difference * 8

    return max(0, min(100, score))


def uv_score(uv: float) -> float:
    """
    Što je UV manji, termin je bolji
    za outdoor aktivnosti.
    """

    if uv <= 2:
        return 100

    if uv <= 4:
        return 75

    if uv <= 6:
        return 45

    if uv <= 8:
        return 20

    return 0


def weather_score(weather_code: int) -> float:
    """
    Procena vremenskih uslova.
    """

    # Vedro
    if weather_code in [0, 1]:
        return 100

    # Oblačno
    if weather_code in [2, 3]:
        return 85

    # Slaba kiša
    if weather_code in [51, 53, 55, 61, 63]:
        return 40

    # Jaka kiša
    if weather_code in [65, 80, 81, 82]:
        return 10

    # Sneg
    if weather_code in [71, 73, 75, 77, 85, 86]:
        return 20

    # Oluja
    if weather_code in [95, 96, 99]:
        return 0

    return 50


# ---------------------------------------------------------
# OUTDOOR SCORE
# ---------------------------------------------------------

def calculate_outdoor_score(weather: dict) -> float:
    """
    Ukupan score termina za outdoor aktivnost.

    Trenutno:
        temperatura = 40%
        UV          = 40%
        vreme       = 20%
    """

    temperature = temperature_score(
        weather["temperature"]
    )

    uv = uv_score(
        weather["uvIndex"]
    )

    condition = weather_score(
        weather["weatherCode"]
    )

    return (
        temperature * 0.40
        + uv * 0.40
        + condition * 0.20
    )


# ---------------------------------------------------------
# CONFLICT
# ---------------------------------------------------------

def has_conflict(
    start: int,
    end: int,
    occupied: list[tuple[int, int]]
) -> bool:

    for occupied_start, occupied_end in occupied:

        if start < occupied_end and end > occupied_start:
            return True

    return False


# ---------------------------------------------------------
# WEATHER FOR SLOT
# ---------------------------------------------------------

def get_weather_for_slot(
    start: int,
    duration: int,
    weather_hours: list[dict]
):
    """
    Za sada koristimo hourly prognozu.

    Tražimo weather podatke za početni sat.
    """

    for weather in weather_hours:

        dt = datetime.fromisoformat(
            weather["time"]
        )

        weather_start = dt.hour * 60 + dt.minute

        if weather_start == start:
            return weather

    return None


# ---------------------------------------------------------
# GENERATE POSSIBLE SLOTS
# ---------------------------------------------------------

def generate_possible_slots(
    activity,
    weather_hours,
    occupied
):

    earliest = time_to_minutes(
        activity.earliest
    )

    latest = time_to_minutes(
        activity.latest
    )

    duration = activity.duration

    possible_slots = []

    # Idemo na svakih 30 minuta
    step = 30

    current = earliest

    while current + duration <= latest:

        end = current + duration

        # Ne sme da se preklapa
        if not has_conflict(
            current,
            end,
            occupied
        ):

            weather = get_weather_for_slot(
                current,
                duration,
                weather_hours
            )

            # Ako nemamo weather podatke
            # ipak možemo napraviti slot
            if activity.outdoor:

                if weather is None:
                    current += step
                    continue

                score = calculate_outdoor_score(
                    weather
                )

            else:
                # Indoor aktivnosti ne zavise
                # od vremena
                score = 50

            possible_slots.append({
                "start": current,
                "end": end,
                "score": score,
                "weather": weather
            })

        current += step

    return possible_slots


# ---------------------------------------------------------
# FIXED ACTIVITIES
# ---------------------------------------------------------

def add_fixed_activities(
    activities,
    occupied,
    plan
):

    for activity in activities:

        if not activity.fixed:
            continue

        start = time_to_minutes(
            activity.start
        )

        end = time_to_minutes(
            activity.end
        )

        plan.append({
            "type": activity.type,
            "start": activity.start,
            "end": activity.end,
            "duration": activity.duration,
            "fixed": True,
            "outdoor": activity.outdoor,
        })

        occupied.append(
            (start, end)
        )


# ---------------------------------------------------------
# BEST COMBINATION
# ---------------------------------------------------------

def find_best_combination(
    activities,
    possible_slots,
    index=0,
    occupied=None,
    current_plan=None,
    current_score=0
):

    if occupied is None:
        occupied = []

    if current_plan is None:
        current_plan = []

    # Svi smo obradili
    if index >= len(activities):

        return {
            "score": current_score,
            "plan": current_plan.copy()
        }

    activity = activities[index]

    best_result = None

    slots = possible_slots[index]

    # Probaj svaki mogući termin
    for slot in slots:

        start = slot["start"]
        end = slot["end"]

        # Dodatna provera konflikta
        if has_conflict(
            start,
            end,
            occupied
        ):
            continue

        occupied.append(
            (start, end)
        )

        current_plan.append({
            "type": activity.type,
            "start": minutes_to_time(start),
            "end": minutes_to_time(end),
            "duration": activity.duration,
            "fixed": False,
            "outdoor": activity.outdoor,
            "score": round(
                slot["score"],
                2
            )
        })

        result = find_best_combination(
            activities,
            possible_slots,
            index + 1,
            occupied,
            current_plan,
            current_score + slot["score"]
        )

        if (
            best_result is None
            or result["score"] > best_result["score"]
        ):
            best_result = result

        current_plan.pop()
        occupied.pop()

    # Ako ova aktivnost nema nijedan termin
    if best_result is None:

        result = find_best_combination(
            activities,
            possible_slots,
            index + 1,
            occupied,
            current_plan,
            current_score
        )

        if result is not None:
            return result

    return best_result


# ---------------------------------------------------------
# MAIN PLANNER
# ---------------------------------------------------------

def generate_plan(
    activities,
    weather_hours
):

    plan = []

    # Fiksni termini
    occupied = []

    add_fixed_activities(
        activities,
        occupied,
        plan
    )

    # Samo fleksibilne aktivnosti
    flexible = [
        activity
        for activity in activities
        if not activity.fixed
    ]

    # Aktivnosti sa užim windowom
    # prvo dobijaju prednost
    flexible.sort(
        key=lambda activity:
        time_to_minutes(activity.latest)
        - time_to_minutes(activity.earliest)
    )

    # Mogući slotovi za svaku aktivnost
    possible_slots = []

    for activity in flexible:

        slots = generate_possible_slots(
            activity,
            weather_hours,
            occupied
        )

        possible_slots.append(
            slots
        )

    # Pronađi najbolju kombinaciju
    result = find_best_combination(
        flexible,
        possible_slots,
        occupied=occupied
    )

    if result is not None:

        plan.extend(
            result["plan"]
        )

    # Sortiranje po vremenu
    plan.sort(
        key=lambda item:
        time_to_minutes(item["start"])
        if item["start"]
        else 9999
    )

    return plan