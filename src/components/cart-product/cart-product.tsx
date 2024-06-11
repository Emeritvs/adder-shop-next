"use client";
import { MainContext } from "@/contexts/MainContext";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const CartProduct = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const showModal = () => {};

  return (
    <div>
      <div className="justify-between mb-6 rounded-lg bg-zinc-800 text-orange-600 p-6 shadow-md sm:flex sm:justify-start">
        <img
          src={
            "https://ae01.alicdn.com/kf/S51478a32bf3841c389dc8d016da59f91R/LAMZU-Mouse-Gamer-4k-Compativel-Lamzu-Atlantis-OG-V2-PRO.jpg"
          }
          alt="product-image"
          className="rounded-lg w-24"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold">eegknerjgerg</h2>
            <p className="mt-1 text-xs">rfjnrtjgh4h</p>
            <p className="mt-1 text-xs">100</p>
          </div>

          <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                -{" "}
              </span>
              <input
                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                type="number"
                value="2"
                min="1"
              />
              <span className="cursor-pointer rounded-r bg-zinc-900 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                +{" "}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">259.000 ₭</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
