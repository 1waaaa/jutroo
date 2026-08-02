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
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (values: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<OnboardingData>({
    username: "",
    height: 0,
    weight: 0,

    latitude: null,
    longitude: null,

    city: "",
    country: "",

    notificationsEnabled: false,
    cameraEnabled: false,
  });

  function updateData(values: Partial<OnboardingData>) {
    setData((prev) => ({
      ...prev,
      ...values,
    }));
  }

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
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
