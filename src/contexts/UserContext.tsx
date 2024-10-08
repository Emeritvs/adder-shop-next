"use client";
import { UserData } from "@/app/interfaces/users-interface";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextData {
  currentUser: any;
  handleCurrentUser: (user: any) => void;
  userDialogOpen: boolean;
  userModal: (action: string) => void;
  dialogUserAction: string;
  handleUserDialogAction: (product: any) => void;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [dialogUserAction, setUserDialogAction] = useState("add");
  const userModal = (action: string) =>
    setUserDialogOpen(action == "show" ? true : false);

  const handleUserDialogAction = (action: string) => {
    let auxAction = action;
    setUserDialogAction(auxAction);
  };

  const handleCurrentUser = (user: any) => {
    const userData = user;
    setCurrentUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        userDialogOpen,
        userModal,
        currentUser,
        handleCurrentUser,
        dialogUserAction,
        handleUserDialogAction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
