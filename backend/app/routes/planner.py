from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User

from app.schemas.planner_schema import PlannerRequest

from app.services.weather_service import (
    get_current_weather
)

from app.services.planner_service import (
    generate_plan
)


router = APIRouter(
    prefix="/api/planner",
    tags=["Planner"]
)


@router.post("/generate")
def generate_daily_plan(
    request: PlannerRequest,
    db: Session = Depends(get_db)
):

    # --------------------------------
    # USER
    # --------------------------------

    user = (
        db.query(User)
        .filter(
            User.id == request.userId
        )
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # --------------------------------
    # VALIDATE ACTIVITIES
    # --------------------------------

    if not request.activities:
        raise HTTPException(
            status_code=400,
            detail="No activities provided"
        )

    for activity in request.activities:

        if activity.fixed:

            if (
                activity.start is None
                or activity.end is None
            ):
                raise HTTPException(
                    status_code=400,
                    detail=(
                        f"Fixed activity "
                        f"'{activity.type}' "
                        f"must have start and end time."
                    )
                )

        else:

            if activity.duration is None:
                raise HTTPException(
                    status_code=400,
                    detail=(
                        f"Flexible activity "
                        f"'{activity.type}' "
                        f"must have duration."
                    )
                )

            if activity.earliest is None:
                raise HTTPException(
                    status_code=400,
                    detail=(
                        f"Flexible activity "
                        f"'{activity.type}' "
                        f"must have earliest time."
                    )
                )

            if activity.latest is None:
                raise HTTPException(
                    status_code=400,
                    detail=(
                        f"Flexible activity "
                        f"'{activity.type}' "
                        f"must have latest time."
                    )
                )

    # --------------------------------
    # WEATHER
    # --------------------------------

    try:

        weather = get_current_weather(
            user.latitude,
            user.longitude
        )

    except Exception as error:

        raise HTTPException(
            status_code=503,
            detail=str(error)
        )

    # --------------------------------
    # PLANNER
    # --------------------------------

    plan = generate_plan(
        request.activities,
        weather["hourly"]
    )

    # --------------------------------
    # RESPONSE
    # --------------------------------

    return {
        "userId": user.id,
        "plan": plan,
        "weather": {
            "temperature": weather["temperature"],
            "uvIndex": weather["uvIndex"],
            "condition": weather["condition"],
            "weatherCode": weather["weatherCode"],
            "isDay": weather["isDay"]
        }
    }