"use client";
import { MainContext } from "@/contexts/MainContext";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import CartProduct from "../cart-product/cart-product";

/* eslint-disable @next/next/no-img-element */
const CartSidebar = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const {
    cartSidebar,
    cartSidebarOpen
  } = useContext(MainContext);
  const showModal = () => {};

  return (
    <>
      {cartSidebarOpen && (
        <div
          className="flex top-0 right-0 bg-zinc-900 fixed w-1/3 h-full p-8"
          style={{ zIndex: "100" }}
        >
          <div className="flex flex-col justify-between p-2 h-full w-full">
            <span className="flex items-center">
              <FaX
                className="pointer text-white"
                onClick={() => cartSidebar("hide")}
              ></FaX>
              <text className="ml-4 text-white text-xl">Seu carrinho</text>
            </span>

            <div id="cart-items">
              <CartProduct />
            </div>

            <div id="cart-value" className="grid border-t-2 py-4">
              <div className="flex justify-between">
                <span className="text-white">Subtotal</span>
                <span className="text-white font-bold">100</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white">Total</span>
                <span className="text-white font-bold">1000</span>
              </div>
            </div>

            <div className="mb-0 w-full">
              <button className="bg-orange-600 p-8 text-white font-bold rounded w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
