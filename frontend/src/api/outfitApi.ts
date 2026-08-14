import { api } from "./client";

import { ClothingItem, OutfitActivity } from "../constants/outfits";

export interface GeneratedClothingItem {
  id: string;
  filename: string;
  content_type: string;
  image: string;
}

export interface GeneratedOutfit {
  top: GeneratedClothingItem | null;
  bottom: GeneratedClothingItem | null;
  shoes: GeneratedClothingItem | null;
  outerwear: GeneratedClothingItem | null;
  accessories: GeneratedClothingItem[];
  reason: string;
}

export interface OutfitRecommendRequest {
  userId: number;
  activity: OutfitActivity;
  clothes: ClothingItem[];
}

export interface OutfitRecommendResponse {
  userId: number;
  activity: OutfitActivity;
  outfit: GeneratedOutfit;
}

export async function recommendOutfit(
  request: OutfitRecommendRequest,
): Promise<OutfitRecommendResponse> {
  const formData = new FormData();

  formData.append("userId", request.userId.toString());

  formData.append("activity", request.activity);

  request.clothes.forEach((item, index) => {
    const extension =
      item.uri.split(".").pop()?.split("?")[0].toLowerCase() || "jpg";

    const mimeType =
      extension === "png"
        ? "image/png"
        : extension === "webp"
          ? "image/webp"
          : "image/jpeg";

    const file = {
      uri: item.uri,
      name: `clothing_${index}.${extension}`,
      type: mimeType,
    } as any;

    switch (item.category) {
      case "tops":
        formData.append("tops", file);
        break;

      case "bottoms":
        formData.append("bottoms", file);
        break;

      case "shoes":
        formData.append("shoes", file);
        break;

      case "accessories":
        formData.append("accessories", file);
        break;
    }
  });

  const response = await api.post<OutfitRecommendResponse>(
    "/api/outfit/generate",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
