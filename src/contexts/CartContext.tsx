"use client";
import { UserData } from "@/app/interfaces/users-interface";
import { getStoredCartItems } from "@/app/utils/storage";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface CartContextData {
  cartSidebar: (action: string) => void;
  cartItems: any;
  cartSidebarOpen: boolean;
  handleUserCart: (action: string, product: any, index: any) => void;
  cartSubTotal: number;
  calcCartSubTotal: () => void;
  getCartData: () => any;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export const CartContextProvider = ({
  children,
}: CartContextProviderProps) => {

  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]) as any;
  const [cartSubTotal, setCartSubTotal] = useState(0);

  useEffect(() => {
      getCartData();
  }, []);
    
  const cartSidebar = (action: string) =>
    setCartSidebarOpen(action == "show" ? true : false);

  const handleUserCart = (action: string, product: any, index: any) => {
        let cart: any = [...JSON.parse(JSON.stringify(getStoredCartItems()))];
        let auxCart = [];

        if (action == "add") {
          auxCart = addProduct(cart, product);
        } else if (action == "remove") {
          auxCart = cart.filter((item : any) => item._id != product._id);
        } else if (action == "update") {
          auxCart = cart.map((item: any) => {
            if (item._id == product._id) {
              item.quantity = product.quantity;
            }

            return item;
          });
        } else {
          cart = [];
        }
        
        console.warn(auxCart);
        setCartItems(auxCart);
        localStorage.setItem("cartItems", JSON.stringify(auxCart));
        calcCartSubTotal();
  };

  const addProduct = (cart : any, product : any) => {

    const isAdded = cart.some((item : any) => item._id == product._id);

    if (isAdded) {
      cart = cart.map((item : any) => {
        if (item._id == product._id) return {...item, quantity: item.quantity + product.quantity};
        return item;
      });
    }
    else {
      cart = [...cart, product];
    }

    return cart;
  };

  const getCartData = () => {
    const data = getStoredCartItems() ?? [];
    setCartItems(data);
    calcCartSubTotal();
    return data;
  };

  const calcCartSubTotal = () => {
    const subtotal = cartItems
      .map((product: any) => product.price * (product.quantity ?? 1))
      .reduce((partialSum: any, item: any) => partialSum + item, 0);
    setCartSubTotal(subtotal);
  };

  return (
    <CartContext.Provider
      value={{
        cartSidebar,
        cartSidebarOpen,
        cartItems,
        handleUserCart,
        cartSubTotal,
        calcCartSubTotal,
        getCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
