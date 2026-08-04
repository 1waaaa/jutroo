from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    height: float
    weight: float
    city: str
    latitude: float
    longitude: float
