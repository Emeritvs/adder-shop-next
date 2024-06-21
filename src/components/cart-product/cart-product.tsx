"use client";
import { Product } from "@/app/interfaces/products-interface";
import { formatCurrency } from "@/app/utils/formatter";
import { MainContext } from "@/contexts/MainContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import './cart-product.css';
import { CartContext } from "@/contexts/CartContext";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
const CartProduct = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const showModal = () => {};
  const product : Product = props.data;
  const index = props.index;
  const [productTotalPrice, setProductTotalPrice] = useState(1);
  const { handleUserCart, cartItems } = useContext(CartContext);
  const [productQuantity, setProductQuantity] = useState((product as any).quantity ?? 1) as any;

 const handleProductQuantity = (action: string) => {
  let auxProduct : any = JSON.parse(JSON.stringify(product));

  let newQuantity =
    action === "add" ? productQuantity + 1 : Math.max(1, productQuantity - 1);
   auxProduct.quantity = newQuantity;
   handleUserCart("update", auxProduct, index);
   setProductQuantity(newQuantity);
 };

  const handleProductTotalPrice = () => {
   if (product.price != null && product.price != undefined) setProductTotalPrice(product.price * productQuantity);
  };
  
  const removeCartProduct = () => {
   handleUserCart('remove', product, index);
  };

  useEffect(() => {
   handleProductTotalPrice();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(product as any).quantity]);
  return (
    <div key={index}>
      <div className="justify-between m-6 rounded-lg bg-zinc-800 text-orange-600 p-6 shadow-md sm:flex sm:justify-start">
        <Image
          src={product.imageSrc ?? ''}
          alt="product-image"
          className="rounded-lg w-24 object-cover"
          style={{ minWidth:'72px', maxWidth: '72px',  minHeight: '72px', maxHeight: '72px' }}
          width={72}
          height={72}
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="mt-1 text-xs">{index}</p>
          </div>

          <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center">
              <span
                className="h-8 flex items-center cursor-pointer rounded-l bg-zinc-900 py-1 px-3.5 duration-100 hover:bg-orange-600 hover:text-blue-50"
                onClick={() => handleProductQuantity("remove")}
              >
                <FaMinus></FaMinus>
              </span>
              <input
                className="h-8 w-8 border bg-zinc-900 text-center outline-none border-zinc-900 qty-product"
                type="number"
                value={(product as any).quantity}
                min="1"
              />
              <span
                className="h-8 flex items-center cursor-pointer rounded-r bg-zinc-900 py-1 px-3 duration-100 hover:bg-orange-600 hover:text-blue-50"
                onClick={() => handleProductQuantity("add")}
              >
                <FaPlus></FaPlus>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">
                {(product as any).quantity} x {formatCurrency('real', product.price)}
              </p>
              <FaTrash
                className="cursor-pointer"
                onClick={() => removeCartProduct()}
              ></FaTrash>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
