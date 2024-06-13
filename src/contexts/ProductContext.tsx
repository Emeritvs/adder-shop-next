import { UserData } from "@/app/interfaces/users-interface";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProductContextData {
  productDialogOpen: boolean;
  productModal: (action: string) => void;
}

interface ProductContextProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext({} as ProductContextData);

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const productModal = (action: string) =>
    setProductDialogOpen(action == "show" ? true : false);
    
  return (
    <ProductContext.Provider
      value={{
        productDialogOpen,
        productModal
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
