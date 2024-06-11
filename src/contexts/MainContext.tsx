import { UserData } from "@/app/interfaces/users-interface";
import { setUserDataStorage, getUserDataStorage } from "@/app/utils/storage";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface MainContextData {
  userData: UserData;
  handleUserData: (data: any) => void;
  colorMode: string;
  changeColorMode: () => void;
  currentPageTitle: string;
  changePageTitle: (title: string) => void;
  isLogged: boolean;
  isAdmin: boolean;
  toastData: any;
  handleToast: (data: any) => void;
  getUserData: () => UserData;
  userDialogOpen: boolean;
  userModal: (action: string) => void;
  productDialogOpen: boolean;
  productModal: (action: string) => void;
  cartSidebarOpen: boolean;
  cartSidebar: (action: string) => void;
}

interface MainContextProviderProps {
  children: ReactNode;
}

export const MainContext = createContext({} as MainContextData);

export const MainContextProvider = ({ children }: MainContextProviderProps) => {
  const [userData, setUserData] = useState({ id: null, email: null, username: null, password: null, firstname: null, lastname: null}) as any;
  const [colorMode, setColorMode] = useState("dark");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [currentPageTitle, setCurrentPageTitle] = useState("Home");
  const [currentActiveDialog, setCurrentActiveDialog] = useState(null);
  const [toastData, setToastData] = useState({status: 'info', message: 'Example content', visible: false });
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(true);

  const userModal = (action: string) => setUserDialogOpen(action == 'show' ? true : false);
  const productModal = (action: string) =>
    setProductDialogOpen(action == "show" ? true : false);
  const cartSidebar = (action: string) =>
    setCartSidebarOpen(action == "show" ? true : false);
  const changeColorMode = () => {
    setColorMode("dark");
  }

  const changePageTitle = (title : string) => setCurrentPageTitle(title);
  const handleToast = (data : any) => setToastData(data);
  const handleUserData = (data: any) => {
    const logged = data.id != null && data.id != undefined ? true : false;
    const admin = data.role == "admin" ? true : false;

    setUserDataStorage(data);
    setUserData(data);


    setIsLogged(logged);
    setIsAdmin(admin);
  }
  const getUserData = () => {
    const user = getUserDataStorage();
    const logged = user.id != null && user.id != undefined ? true : false;
    const admin = user.role == "admin" ? true : false;

    setIsLogged(logged);
    setIsAdmin(admin);
    return user;
  }

  return (
    <MainContext.Provider
      value={{
        userData,
        handleUserData,
        colorMode,
        changeColorMode,
        currentPageTitle,
        changePageTitle,
        isLogged,
        isAdmin,
        toastData,
        handleToast,
        getUserData,
        userDialogOpen,
        productDialogOpen,
        userModal,
        productModal,
        cartSidebarOpen,
        cartSidebar,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
