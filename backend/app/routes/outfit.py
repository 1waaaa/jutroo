from fastapi import APIRouter, UploadFile, File, Form
from typing import List

from app.services.outfit_service import generate_outfit
from app.schemas.outfit_schema import OutfitRequest

router = APIRouter(
    prefix="/api/outfit",
    tags=["Outfit"]
)

request: OutfitRequest
@router.post("/generate")
async def create_outfit(
    userId: int = Form(...),
    activity: str = Form(...),
    clothes: List[UploadFile] = File(...)
):
    images = []

    for clothes_file in clothes:
        image_bytes = await clothes_file.read()

        images.append({
            "filename": clothes_file.filename,
            "content_type": clothes_file.content_type,
            "data": image_bytes
        })

    outfit = generate_outfit(
        images=images,
        activity=activity
    )

    return {
        "userId": userId,
        "activity": activity,
        "outfit": outfit
    }