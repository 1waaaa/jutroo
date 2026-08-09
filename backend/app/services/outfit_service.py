import os
import json

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

The user uploaded several clothing items.

Activity:
{activity}

Look at ALL uploaded clothing images and create ONE outfit
using only the clothing items that were uploaded.

Do not invent clothing items that are not in the images.

Return ONLY valid JSON.

Use exactly this structure:

{{
    "top": "description of selected top",
    "bottom": "description of selected bottom",
    "shoes": "description of selected shoes",
    "outerwear": "description of selected outerwear or null",
    "accessories": ["description"],
    "reason": "why these pieces work together"
}}
"""

    contents = [prompt]

    for image in images:
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

    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    return json.loads(text)