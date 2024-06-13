/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Product } from "../interfaces/products-interface";
import ProductCardSkeleton from "@/components/products-list-skeleton";
import ProductCard from "@/components/product-card/product-card";
import CartProduct from "@/components/cart-product/cart-product";
import { MainContext } from "@/contexts/MainContext";
import { FaX } from "react-icons/fa6";
import { formatCurrency } from "../utils/formatter";

export default function Account() {
  const { cartSidebarOpen, cartSidebar, cartItems, handleUserCart } =
    useContext(MainContext);

  return (
   <h1 className="text-white">Hello world</h1>
  );
}
