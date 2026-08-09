from fastapi import APIRouter

from app.schemas.planner_schema import PlannerRequest

router = APIRouter(
    prefix="/api/planner",
    tags=["Planner"]
)


@router.post("/")
def generate_plan(request: PlannerRequest):

    return {
        "message": "Planner radi.",
        "activities": request.activities
    }