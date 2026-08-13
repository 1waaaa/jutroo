import { api } from "./client";

import { ClothingItem, OutfitActivity } from "../constants/outfits";

export interface GeneratedOutfit {
  top: string;
  bottom: string;
  shoes: string;
  outerwear: string | null;
  accessories: string[];
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
    const extension = item.uri.split(".").pop()?.toLowerCase() || "jpg";

    const mimeType =
      extension === "png"
        ? "image/png"
        : extension === "webp"
          ? "image/webp"
          : "image/jpeg";

    formData.append("clothes", {
      uri: item.uri,
      name: `clothing_${index}.${extension}`,
      type: mimeType,
    } as any);
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
