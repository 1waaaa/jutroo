import { createContext, ReactNode, useContext, useState } from "react";

import { ClothingItem, OutfitActivity } from "../constants/outfits";

export interface SelectedOutfit {
  activity: OutfitActivity;

  top?: ClothingItem;

  bottom?: ClothingItem;

  shoes?: ClothingItem;

  accessory?: ClothingItem;

  reason: string;
}

interface OutfitContextType {
  outfit: SelectedOutfit | null;

  setOutfit: (outfit: SelectedOutfit) => void;

  clearOutfit: () => void;
}

const OutfitContext = createContext<OutfitContextType | undefined>(undefined);

export function OutfitProvider({ children }: { children: ReactNode }) {
  const [outfit, setOutfit] = useState<SelectedOutfit | null>(null);

  function clearOutfit() {
    setOutfit(null);
  }

  return (
    <OutfitContext.Provider
      value={{
        outfit,
        setOutfit,
        clearOutfit,
      }}
    >
      {children}
    </OutfitContext.Provider>
  );
}

export function useOutfit() {
  const context = useContext(OutfitContext);

  if (!context) {
    throw new Error("useOutfit must be used inside OutfitProvider");
  }

  return context;
}
