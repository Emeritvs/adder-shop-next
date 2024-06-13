/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { MainContext } from "@/contexts/MainContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import CartProduct from "../cart-product/cart-product";
import { formatCurrency } from "@/app/utils/formatter";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const CartSidebarMenu = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const { cartSidebarOpen, cartSidebar, cartItems, handleUserCart } =
    useContext(MainContext);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  const calcSubTotal = () => {
   const subtotal = cartItems.map((product : any) => product.price * (product.quantity ?? 1))
   .reduce((partialSum : any, item : any) => partialSum + item, 0);

   setCartSubTotal(subtotal);
  };

  const clearCart = () => {
   handleUserCart('clear', {}, 0);
  };

  const calcCheckoutTotal = () => {
   const discount = 0;
   const delivery = 20;
   return formatCurrency('real', cartSubTotal - discount + delivery);
  };

  useEffect(() => {
   calcSubTotal();
  }, [cartItems]);

  return (
    <div>
      <div
        className={`flex top-0 right-0 bg-zinc-900 fixed w-1/3 h-full p-8 peer-focus:right-0 peer:transition ease-in-out duration-300 ${
          cartSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: "100" }}
      >
        <div className="flex flex-col justify-between p-2 h-full w-full">
          <div className="flex flex-row justify-between">
            <label className="flex items-center">
              <FaX
                className="cursor-pointer text-white"
                onClick={() => cartSidebar("hide")}
              ></FaX>
              <span className="ml-4 text-white text-xl">Your cart</span>
            </label>

            <hr  className="bg-orange-600"/>

            <label className="flex items-center">
              <span
                className="ml-4 text-white text-md cursor-pointer"
                onClick={() => clearCart()}
              >
                clear cart
              </span>
            </label>
          </div>

          <div
            id="cart-items"
            style={{
              overflowY: `${cartItems.length > 0 ? "scroll" : "hidden"}`,
            }}
          >
            {cartItems.length <= 0 ? (
              <p className="text-white text-xl">No items added.</p>
            ) : (
              (cartItems as any).map((item: any, index: any) => (
                <CartProduct key={index} data={item} index={index} />
              ))
            )}
          </div>

          <div id="cart-value" className="grid border-t-2 py-4">
            <div className="flex justify-between">
              <span className="text-white">Subtotal</span>
              <span className="text-white">
                {formatCurrency("real", cartSubTotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-white">Total</span>
              <span className="text-white font-bold">
                {calcCheckoutTotal()}
              </span>
            </div>
          </div>

          <div className="mb-0 w-full">
            <Link href="/checkout">
              <button className="bg-orange-600 p-8 text-white font-bold rounded w-full">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarMenu;
