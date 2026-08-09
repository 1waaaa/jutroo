from pydantic import BaseModel

class ActivityRequest(BaseModel):
    type: str
    fixed: bool

    duration: int | None = None

    earliest: str | None = None
    latest: str | None = None

    start: str | None = None
    end: str | None = None


class PlannerRequest(BaseModel):
    userId: int
    activities: list[ActivityRequest]