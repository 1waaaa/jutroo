import os
import json
import base64

from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set")

client = genai.Client(api_key=api_key)


def generate_outfit(images, activity: str):

    prompt = f"""
You are a fashion assistant.

The user uploaded clothing items.

Activity:
{activity}

Each uploaded image has an ID and a category.

Look at ALL uploaded clothing images and create ONE outfit
using ONLY clothing items from the uploaded images.

IMPORTANT RULES:

1. NEVER invent a clothing item.
2. You MUST select items using their exact IMAGE ID.
3. Only select a TOP for the top.
4. Only select a BOTTOM for the bottom.
5. Only select SHOES for shoes.
6. Only select OUTERWEAR for outerwear.
7. Only select ACCESSORY for accessories.
8. You do NOT have to use outerwear.
9. You do NOT have to use accessories.
10. Select clothes that are appropriate for the activity.
11. Consider the activity when choosing the outfit.

Examples:
- University: choose an appropriate university outfit.
- Gym: choose clothes suitable for exercising.
- Walking: choose comfortable clothes appropriate for walking.
- Do NOT choose jeans for gym if suitable sports bottoms are available.
- Do NOT choose obviously inappropriate clothing for university.

Return ONLY valid JSON.
Do not use markdown.
Do not write anything outside the JSON.

Use EXACTLY this structure:

{{
    "top": "IMAGE_ID",
    "bottom": "IMAGE_ID",
    "shoes": "IMAGE_ID",
    "outerwear": null,
    "accessories": [],
    "reason": "short explanation"
}}

Available clothing items:
"""

    contents = [prompt]

    # Dodajemo opis svakog uploadovanog fajla
    for image in images:

        contents.append(
            f"""
IMAGE ID: {image["id"]}
CATEGORY: {image["category"]}
FILENAME: {image["filename"]}
"""
        )

        contents.append(
            types.Part.from_bytes(
                data=image["data"],
                mime_type=image["content_type"]
            )
        )

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents
    )

    text = response.text.strip()

    # Ako Gemini ipak vrati markdown code block
    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    outfit = json.loads(text)

    # -----------------------------------------
    # Pronalaženje konkretnih izabranih slika
    # -----------------------------------------

    images_by_id = {
        image["id"]: image
        for image in images
    }

    def image_result(image_id):
        if not image_id:
            return None

        image = images_by_id.get(image_id)

        if not image:
            return None

        return {
            "id": image["id"],
            "filename": image["filename"],
            "content_type": image["content_type"],
            "image": (
                "data:"
                + image["content_type"]
                + ";base64,"
                + base64.b64encode(image["data"]).decode("utf-8")
            )
        }

    # -----------------------------------------
    # Finalni rezultat
    # -----------------------------------------

    return {
        "top": image_result(outfit.get("top")),

        "bottom": image_result(
            outfit.get("bottom")
        ),

        "shoes": image_result(
            outfit.get("shoes")
        ),

        "outerwear": image_result(
            outfit.get("outerwear")
        ),

        "accessories": [
            image_result(accessory_id)
            for accessory_id in outfit.get("accessories", [])
            if image_result(accessory_id) is not None
        ],

        "reason": outfit.get("reason", "")
    }