import { UserData } from "@/app/interfaces/users-interface";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface AccountContextData {
  // userDialogOpen: boolean;
  // userModal: (action: string) => void;
}

interface AccountContextProviderProps {
  children: ReactNode;
}

export const AccountContext = createContext({} as AccountContextData);

export const AccountContextProvider = ({ children }: AccountContextProviderProps) => {

  return (
    <AccountContext.Provider
      value={{}}
    >
      {children}
    </AccountContext.Provider>
  );
};
