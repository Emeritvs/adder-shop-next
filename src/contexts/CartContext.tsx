import { UserData } from "@/app/interfaces/users-interface";
import { getStoredCartItems } from "@/app/utils/storage";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface CartContextData {
  cartSidebar: (action: string) => void;
  cartItems: any;
  cartSidebarOpen: boolean;
  handleUserCart: (action: string, product: any, index: any) => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export const CartContextProvider = ({
  children,
}: CartContextProviderProps) => {

  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState(getStoredCartItems()) as any;
  const cartSidebar = (action: string) =>
    setCartSidebarOpen(action == "show" ? true : false);

  const handleUserCart = (action: string, product: any, index: any) => {
        let cart: any = [...JSON.parse(JSON.stringify(getStoredCartItems()))];
        if (action == "add") {
          cart = [...cart, product];
        } else if (action == "remove") {
          cart = cart.filter((item : any) => item._id != product._id);
        } else if (action == "update") {
          cart.map((item: any) => {
            if (item._id == product._id) {
              item.quantity = product.quantity;
            }

            return item;
          });
        } else {
          cart = [];
        }

        setCartItems(cart);
        localStorage.setItem("cartItems", JSON.stringify(cart));
      };

  return (
    <CartContext.Provider
      value={{
        cartSidebar,
        cartSidebarOpen,
        cartItems,
        handleUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
