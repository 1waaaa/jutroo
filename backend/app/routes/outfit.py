from fastapi import APIRouter, UploadFile, File, Form
from typing import List

from app.services.outfit_service import generate_outfit

router = APIRouter(
    prefix="/api/outfit",
    tags=["Outfit"]
)


@router.post("/generate")
async def create_outfit(
    userId: int = Form(...),
    activity: str = Form(...),

    tops: List[UploadFile] = File(default=[]),
    bottoms: List[UploadFile] = File(default=[]),
    shoes: List[UploadFile] = File(default=[]),
    outerwear: List[UploadFile] = File(default=[]),
    accessories: List[UploadFile] = File(default=[])
):

    images = []

    async def add_images(files, category, prefix):

        for index, clothes_file in enumerate(files):

            image_bytes = await clothes_file.read()

            images.append({
                "id": f"{prefix}_{index + 1}",
                "category": category,
                "filename": clothes_file.filename,
                "content_type": clothes_file.content_type,
                "data": image_bytes
            })

    await add_images(tops, "top", "top")
    await add_images(bottoms, "bottom", "bottom")
    await add_images(shoes, "shoes", "shoes")
    await add_images(outerwear, "outerwear", "outerwear")
    await add_images(accessories, "accessory", "accessory")

    if not images:
        return {
            "error": "No clothing images were uploaded."
        }

    outfit = generate_outfit(
        images=images,
        activity=activity
    )

    return {
        "userId": userId,
        "activity": activity,
        "outfit": outfit
    }