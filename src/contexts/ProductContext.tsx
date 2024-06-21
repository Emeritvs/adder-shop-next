import { UserData } from "@/app/interfaces/users-interface";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProductContextData {
  currentProduct: any;
  handleCurrentProduct: (product : any) => void;
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
  const [currentProduct, setCurrentProduct] = useState({});
  const productModal = (action: string) =>
    setProductDialogOpen(action == "show" ? true : false);
  const handleCurrentProduct = (product : any) => {
   const productData = product;
   setCurrentProduct(productData);
  };

  return (
    <ProductContext.Provider
      value={{
        productDialogOpen,
        productModal,
        currentProduct,
        handleCurrentProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
