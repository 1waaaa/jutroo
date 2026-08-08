import requests


def get_current_weather(latitude: float, longitude: float):

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={latitude}"
        f"&longitude={longitude}"
        "&current=temperature_2m,weather_code,is_day"
        "&hourly=temperature_2m,uv_index,weather_code"
        "&timezone=auto"
        "&forecast_days=2"
    )

    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Weather API unavailable")

    data = response.json()

    current = data["current"]
    hourly = data["hourly"]

    weather_code = current["weather_code"]

    weather_map = {
        0: "Sunny",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Cloudy",
        61: "Rain",
        63: "Rain",
        65: "Heavy rain",
        71: "Snow",
        95: "Thunderstorm",
    }

    return {
        "temperature": current["temperature_2m"],
        "uvIndex": hourly["uv_index"][0],
        "condition": weather_map.get(weather_code, "Unknown"),
        "weatherCode": weather_code,
        "isDay": current["is_day"],

        "hourly": [
            {
                "time": hourly["time"][i],
                "temperature": hourly["temperature_2m"][i],
                "uvIndex": hourly["uv_index"][i],
                "weatherCode": hourly["weather_code"][i],
            }
            for i in range(len(hourly["time"]))
        ],
    }