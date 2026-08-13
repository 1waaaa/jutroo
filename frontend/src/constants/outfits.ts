export type OutfitActivity =
  | "UNIVERSITY"
  | "GYM"
  | "WALK"
  | "SHOPPING"
  | "DINNER"
  | "DATE";

export interface OutfitCategory {
  id: "tops" | "bottoms" | "shoes" | "accessories";
  title: string;
  maxItems: number;
}

export interface ClothingItem {
  id: number;
  uri: string;
  category: "tops" | "bottoms" | "shoes" | "accessories";
}

export const OUTFIT_ACTIVITIES: {
  id: OutfitActivity;
  title: string;
}[] = [
  {
    id: "UNIVERSITY",
    title: "University",
  },
  {
    id: "GYM",
    title: "Gym",
  },
  {
    id: "WALK",
    title: "Walk",
  },
  {
    id: "SHOPPING",
    title: "Shopping",
  },
  {
    id: "DINNER",
    title: "Dinner",
  },
  {
    id: "DATE",
    title: "Date",
  },
];

export const OUTFIT_CATEGORIES: OutfitCategory[] = [
  {
    id: "tops",
    title: "Tops",
    maxItems: 2,
  },
  {
    id: "bottoms",
    title: "Bottoms",
    maxItems: 2,
  },
  {
    id: "shoes",
    title: "Shoes",
    maxItems: 2,
  },
  {
    id: "accessories",
    title: "Accessories",
    maxItems: 2,
  },
];
