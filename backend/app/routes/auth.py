from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    new_user = User(
        username=user.username,
        height=user.height,
        weight=user.weight,
        city=user.city,
        latitude=user.latitude,
        longitude=user.longitude
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user