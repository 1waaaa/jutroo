import { api } from "./client";

import { OutfitActivity, ClothingItem } from "../constants/outfits";

export interface OutfitRecommendRequest {
  planId: number;
  activity: OutfitActivity;
  tops: ClothingItem[];
  bottoms: ClothingItem[];
  shoes: ClothingItem[];
  accessories: ClothingItem[];
}

export interface OutfitRecommendResponse {
  selectedTop: number;
  selectedBottom: number;
  selectedShoes: number;
  selectedAccessory: number;
  reason: string;
}

export async function recommendOutfit(request: OutfitRecommendRequest) {
  const response = await api.post<OutfitRecommendResponse>(
    "/api/outfit/recommend",
    request,
  );

  return response.data;
}
