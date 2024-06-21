/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import CartProduct from "@/components/cart-product/cart-product";
import { formatCurrency } from "../utils/formatter";
import { CartContext } from "@/contexts/CartContext";

export default function Checkout() {
  const { cartSidebarOpen, cartSidebar, cartItems, handleUserCart } =
    useContext(CartContext);
  const [cartSubTotal, setCartSubTotal] = useState(0);

  const calcSubTotal = () => {
    let teste = cartItems
      .map((product: any) => product.price * (product.quantity ?? 1))
      .reduce((partialSum: any, item: any) => partialSum + item, 0);

    setCartSubTotal(teste);
  };

  const clearCart = () => {
    handleUserCart("clear", {}, 0);
  };

  const calcCheckoutTotal = () => {
    const discount = 0;
    const delivery = 20;
    return cartSubTotal - discount + delivery;
  };

  useEffect(() => {
    calcSubTotal();
  }, [cartItems]);


  return (
    <div className="flex flex-col justify-between p-2 h-full w-full">
      <div className="mx-auto w-2/3 justify-center px-6 md:space-x-6 xl:px-0">
        <div className="flex flex-row justify-center">
          <label className="flex items-center">
            <span className="ml-4 text-white font-bold text-xl">Your cart</span>
          </label>

          <label className="ml-auto flex items-center">
            <span
              className="ml-4 text-white text-md cursor-pointer"
              onClick={() => clearCart()}
            >
              clear cart
            </span>
          </label>
        </div>

        <div className="flex flex-row items-start">
          <div
            id="cart-items"
            style={{
              overflowY: `${cartItems.length > 0 ? "auto" : "hidden"}`,
            }}
            className="rounded-lg md:w-2/3"
          >
            {cartItems.length <= 0 ? (
              <p className="text-white text-xl">No items added.</p>
            ) : (
              (cartItems as any).map((item: any, index: any) => (
                <CartProduct key={index} data={item} index={index} />
              ))
            )}
          </div>

          <div className="mt-6 h-full rounded-lg bg-zinc-800 p-6 shadow-md md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-orange-600">Subtotal</p>
              <p className="text-orange-600">
                {formatCurrency("real", cartSubTotal)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-orange-600">Shipping</p>
              <p className="text-orange-600">{formatCurrency("real", 20.0)}</p>
            </div>
            <hr className="my-4 border-orange-600" />
            <div className="flex justify-between">
              <p className="text-lg text-orange-600 font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg text-orange-600 font-bold">
                  {formatCurrency("real", calcCheckoutTotal())}
                </p>
                <p className="text-sm text-orange-600">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-orange-600 py-1.5 font-medium text-blue-50 hover:bg-zinc-900">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
