import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  userId: number | null;

  setUserId: (id: number | null) => void;

  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);

  function logout() {
    setUserId(null);
  }

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
