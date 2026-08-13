import {
  GraduationCap,
  Dumbbell,
  Footprints,
  ShoppingBag,
  Utensils,
  Heart,
  Shirt,
  Layers3,
  Footprints as ShoeIcon,
  Gem,
  LucideIcon,
} from "lucide-react-native";

export const OUTFIT_ACTIVITY_ICONS: Record<string, LucideIcon> = {
  UNIVERSITY: GraduationCap,
  GYM: Dumbbell,
  WALK: Footprints,
  SHOPPING: ShoppingBag,
  DINNER: Utensils,
  DATE: Heart,
};

export const OUTFIT_CATEGORY_ICONS: Record<string, LucideIcon> = {
  tops: Shirt,
  bottoms: Layers3,
  shoes: ShoeIcon,
  accessories: Gem,
};
