from datetime import datetime


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

def temperature_score(
    temperature: float
) -> float:

    ideal_min = 20
    ideal_max = 24

    if ideal_min <= temperature <= ideal_max:
        return 100

    if temperature < ideal_min:
        difference = ideal_min - temperature
    else:
        difference = temperature - ideal_max

    score = 100 - difference * 8

    return max(
        0,
        min(100, score)
    )


def uv_score(
    uv: float
) -> float:

    if uv <= 2:
        return 100

    if uv <= 4:
        return 75

    if uv <= 6:
        return 45

    if uv <= 8:
        return 20

    return 0


def weather_score(
    weather_code: int
) -> float:

    # Vedro
    if weather_code in [0, 1]:
        return 100

    # Oblačno
    if weather_code in [2, 3]:
        return 85

    # Slaba kiša
    if weather_code in [
        51, 53, 55,
        61, 63
    ]:
        return 40

    # Jaka kiša
    if weather_code in [
        65, 80, 81, 82
    ]:
        return 10

    # Sneg
    if weather_code in [
        71, 73, 75,
        77, 85, 86
    ]:
        return 20

    # Oluja
    if weather_code in [
        95, 96, 99
    ]:
        return 0

    return 50


# ---------------------------------------------------------
# OUTDOOR SCORE
# ---------------------------------------------------------

def calculate_outdoor_score(
    weather: dict
) -> float:

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

    for (
        occupied_start,
        occupied_end
    ) in occupied:

        if (
            start < occupied_end
            and end > occupied_start
        ):
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

    best_weather = None
    best_difference = None

    for weather in weather_hours:

        dt = datetime.fromisoformat(
            weather["time"]
        )

        weather_start = (
            dt.hour * 60
            + dt.minute
        )

        difference = abs(
            weather_start - start
        )

        if (
            best_difference is None
            or difference < best_difference
        ):
            best_difference = difference
            best_weather = weather

    return best_weather


# ---------------------------------------------------------
# GENERATE POSSIBLE SLOTS
# ---------------------------------------------------------

def generate_possible_slots(
    activity,
    weather_hours,
    occupied
):

    if activity.duration is None:
        return []

    if activity.earliest is None:
        return []

    if activity.latest is None:
        return []

    earliest = time_to_minutes(
        activity.earliest
    )

    latest = time_to_minutes(
        activity.latest
    )

    duration = activity.duration

    if duration <= 0:
        return []

    if earliest >= latest:
        return []

    possible_slots = []

    step = 30

    current = earliest

    while current + duration <= latest:

        end = current + duration

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

            if activity.outdoor:

                if weather is None:
                    current += step
                    continue

                score = calculate_outdoor_score(
                    weather
                )

            else:

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

        if activity.start is None:
            continue

        if activity.end is None:
            continue

        start = time_to_minutes(
            activity.start
        )

        end = time_to_minutes(
            activity.end
        )

        if end <= start:
            continue

        duration = activity.duration

        if duration is None:
            duration = end - start

        plan.append({
            "type": activity.type,
            "start": activity.start,
            "end": activity.end,
            "duration": duration,
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

    # Sve aktivnosti obrađene
    if index >= len(activities):

        return {
            "score": current_score,
            "plan": current_plan.copy()
        }

    activity = activities[index]

    best_result = None

    slots = possible_slots[index]

    for slot in slots:

        start = slot["start"]
        end = slot["end"]

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

        if result is not None:

            if (
                best_result is None
                or result["score"]
                > best_result["score"]
            ):
                best_result = result

        current_plan.pop()
        occupied.pop()

    if best_result is None:
        return None

    return best_result


# ---------------------------------------------------------
# MAIN PLANNER
# ---------------------------------------------------------

def generate_plan(
    activities,
    weather_hours
):

    plan = []

    occupied = []

    # --------------------------------
    # FIXED
    # --------------------------------

    add_fixed_activities(
        activities,
        occupied,
        plan
    )

    # --------------------------------
    # FLEXIBLE
    # --------------------------------

    flexible = [
        activity
        for activity in activities
        if not activity.fixed
    ]

    # Aktivnosti sa užim windowom
    # imaju prednost
    flexible.sort(
        key=lambda activity:
        (
            time_to_minutes(
                activity.latest
            )
            -
            time_to_minutes(
                activity.earliest
            )
        )
        if (
            activity.latest is not None
            and activity.earliest is not None
        )
        else 999999
    )

    # --------------------------------
    # POSSIBLE SLOTS
    # --------------------------------

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

    # --------------------------------
    # BEST COMBINATION
    # --------------------------------

    if flexible:

        result = find_best_combination(
            flexible,
            possible_slots,
            occupied=occupied
        )

        if result is not None:

            plan.extend(
                result["plan"]
            )

    # --------------------------------
    # SORT
    # --------------------------------

    plan.sort(
        key=lambda item:
        time_to_minutes(
            item["start"]
        )
    )

    return plan