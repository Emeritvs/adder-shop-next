import { UserData } from "@/app/interfaces/users-interface";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AccountContextData {
  userDialogOpen: boolean;
  userModal: (action: string) => void;
}

interface AccountContextProviderProps {
  children: ReactNode;
}

export const AccountContext = createContext({} as AccountContextData);

export const AccountContextProvider = ({ children }: AccountContextProviderProps) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const userModal = (action: string) =>
    setUserDialogOpen(action == "show" ? true : false);

  return (
    <AccountContext.Provider
      value={{
        userModal,
        userDialogOpen,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
