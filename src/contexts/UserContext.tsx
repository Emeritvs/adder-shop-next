import { UserData } from "@/app/interfaces/users-interface";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextData {
  currentUser: any;
  handleCurrentUser: (user: any) => void;
  userDialogOpen: boolean;
  userModal: (action: string) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export const UserContextProvider = ({
  children,
}: UserContextProviderProps) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const userModal = (action: string) =>
    setUserDialogOpen(action == "show" ? true : false);
    
  const handleCurrentUser = (user: any) => {
    const userData = user;
    console.warn(userData);
    setCurrentUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        userDialogOpen,
        userModal,
        currentUser,
        handleCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
