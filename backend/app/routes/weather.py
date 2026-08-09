from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.services.weather_service import get_current_weather

router = APIRouter(
    prefix="/api/weather",
    tags=["Weather"]
)


@router.get("/current/{user_id}")
def current_weather(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return get_current_weather(
        user.latitude,
        user.longitude
    )