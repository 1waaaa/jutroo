from pydantic import BaseModel


class OutfitRequest(BaseModel):
    userId: int
    activity: str