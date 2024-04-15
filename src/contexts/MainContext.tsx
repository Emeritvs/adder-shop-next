import React, { createContext, useState, useContext, ReactNode } from "react";

interface MainContextData {
  colorMode: string;
  changeColorMode: () => void;
  currentPageTitle: string;
  changePageTitle: (title : string) => void;
}

interface MainContextProviderProps {
  children: ReactNode;
}

export const MainContext = createContext({} as MainContextData);

export const MainContextProvider = ({ children }: MainContextProviderProps) => {
  const [colorMode, setColorMode] = useState("light");
  const [currentPageTitle, setCurrentPageTitle] = useState("Home");

  const changeColorMode = () => {
    setColorMode("dark");
  }

  const changePageTitle = (title : string) => { 
    setCurrentPageTitle(title);
    console.log(currentPageTitle)
  }

  return (
    <MainContext.Provider value={{ colorMode, changeColorMode, currentPageTitle, changePageTitle}}>
      {children}
    </MainContext.Provider>
  );
};
