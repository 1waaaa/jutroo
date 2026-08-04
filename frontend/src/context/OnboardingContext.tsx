import React, { createContext, useContext, useState } from "react";

export interface OnboardingData {
  username: string;

  height: number;

  weight: number;

  latitude: number | null;

  longitude: number | null;

  city: string;

  country: string;

  notificationsEnabled: boolean;

  cameraEnabled: boolean;

  userId?: number;
}

interface OnboardingContextType {
  data: OnboardingData;

  updateData: (values: Partial<OnboardingData>) => void;

  resetData: () => void;
}

const initialData: OnboardingData = {
  username: "",

  height: 0,

  weight: 0,

  latitude: null,

  longitude: null,

  city: "",

  country: "",

  notificationsEnabled: false,

  cameraEnabled: false,

  userId: undefined,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<OnboardingData>(initialData);

  function updateData(values: Partial<OnboardingData>) {
    setData((prev) => ({
      ...prev,
      ...values,
    }));
  }

  function resetData() {
    setData(initialData);
  }

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        resetData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }

  return context;
}
