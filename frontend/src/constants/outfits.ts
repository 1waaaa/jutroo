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
  emoji: string;
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
  emoji: string;
}[] = [
  {
    id: "UNIVERSITY",
    title: "University",
    emoji: "🎓",
  },
  {
    id: "GYM",
    title: "Gym",
    emoji: "🏋️",
  },
  {
    id: "WALK",
    title: "Walk",
    emoji: "🚶",
  },
  {
    id: "SHOPPING",
    title: "Shopping",
    emoji: "🛍️",
  },
  {
    id: "DINNER",
    title: "Dinner",
    emoji: "🍽️",
  },
  {
    id: "DATE",
    title: "Date",
    emoji: "❤️",
  },
];

export const OUTFIT_CATEGORIES: OutfitCategory[] = [
  {
    id: "tops",
    title: "Tops",
    emoji: "👕",
    maxItems: 2,
  },
  {
    id: "bottoms",
    title: "Bottoms",
    emoji: "🩳",
    maxItems: 2,
  },
  {
    id: "shoes",
    title: "Shoes",
    emoji: "👟",
    maxItems: 2,
  },
  {
    id: "accessories",
    title: "Accessories",
    emoji: "👜",
    maxItems: 2,
  },
];
