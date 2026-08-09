//import apiClient from "./client";

import { ClothingItem, OutfitActivity } from "../constants/outfits";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

export interface OutfitRecommendResponse {
  selectedTop: number;
  selectedBottom: number;
  selectedShoes: number;
  selectedAccessory: number;
  reason: string;
}

export interface OutfitRecommendRequest {
  planId: number;
  activity: OutfitActivity;

  tops: ClothingItem[];
  bottoms: ClothingItem[];
  shoes: ClothingItem[];
  accessories: ClothingItem[];
}

/*
|--------------------------------------------------------------------------
| POST /api/outfit/recommend
|--------------------------------------------------------------------------
|
*/

export async function recommendOutfit(
  request: OutfitRecommendRequest,
): Promise<OutfitRecommendResponse> {
  /*
  ============================================================
  BACKEND VERSION
  ============================================================

  const formData = new FormData();

  formData.append(
    "planId",
    request.planId.toString(),
  );

  formData.append(
    "activity",
    request.activity,
  );

  request.tops.forEach((item, index) => {
    formData.append(
      "tops",
      {
        uri: item.uri,
        name: `top_${index}.jpg`,
        type: "image/jpeg",
      } as any,
    );
  });

  request.bottoms.forEach((item, index) => {
    formData.append(
      "bottoms",
      {
        uri: item.uri,
        name: `bottom_${index}.jpg`,
        type: "image/jpeg",
      } as any,
    );
  });

  request.shoes.forEach((item, index) => {
    formData.append(
      "shoes",
      {
        uri: item.uri,
        name: `shoes_${index}.jpg`,
        type: "image/jpeg",
      } as any,
    );
  });

  request.accessories.forEach((item, index) => {
    formData.append(
      "accessories",
      {
        uri: item.uri,
        name: `accessory_${index}.jpg`,
        type: "image/jpeg",
      } as any,
    );
  });

  const response =
    await apiClient.post<OutfitRecommendResponse>(
      "/api/outfit/recommend",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

  return response.data;
  */

  /*
  ============================================================
  MOCK
  ============================================================
  */

  return {
    selectedTop: 0,
    selectedBottom: 0,
    selectedShoes: 0,
    selectedAccessory: 0,

    reason: "This outfit is perfect for your activity and today's weather.",
  };
}

/*
|--------------------------------------------------------------------------
| GET /api/outfit/{id}
|--------------------------------------------------------------------------
*/

export interface SavedOutfitResponse {
  id: number;
  userId: number;
  planId: number;
  activity: OutfitActivity;

  selectedTop: number | null;
  selectedBottom: number | null;
  selectedShoes: number | null;
  selectedAccessory: number | null;

  reason: string;

  createdAt?: string;
}

export async function getOutfit(id: number): Promise<SavedOutfitResponse> {
  /*
  const response =
    await apiClient.get<SavedOutfitResponse>(
      `/api/outfit/${id}`,
    );

  return response.data;
  */

  throw new Error("getOutfit backend endpoint is not connected yet.");
}

/*
|--------------------------------------------------------------------------
| GET /api/outfit/user/{userId}
|--------------------------------------------------------------------------
*/

export async function getUserOutfit(
  userId: number,
): Promise<SavedOutfitResponse | null> {
  /*
  const response =
    await apiClient.get<SavedOutfitResponse | null>(
      `/api/outfit/user/${userId}`,
    );

  return response.data;
  */

  return null;
}

/*
|--------------------------------------------------------------------------
| DELETE /api/outfit/{id}
|--------------------------------------------------------------------------
*/

export async function deleteOutfit(id: number): Promise<void> {
  /*
  await apiClient.delete(
    `/api/outfit/${id}`,
  );
  */
}
