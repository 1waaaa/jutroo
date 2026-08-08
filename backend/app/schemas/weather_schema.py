from pydantic import BaseModel

class WeatherResponse(BaseModel):
    temperature: float
    uvIndex: float
    condition: str
    weatherCode: int