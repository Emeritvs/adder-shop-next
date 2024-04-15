/* eslint-disable @next/next/no-img-element */
"use client";
import { Product } from "@/app/interfaces/products-interface";
import ProductCard from "@/components/product-card";
import ProductCardSkeleton from "@/components/products-list-skeleton";
import { MainContext } from "@/contexts/MainContext";
import { usePathname } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";

export default function Mice() {
  const pathName = usePathname();
  const [products, setProducts] = useState([] as Product);
  const { colorMode, changeColorMode, currentPageTitle, changePageTitle } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  const loadPage = () => {
    changePageTitle("testando");
    console.warn(currentPageTitle);
  };
  const fetchData = async () => {
    try {


      const res = await fetch("http://localhost:3000/api/products?type=mice", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
      loadPage();
      fetchData();
    }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2
        className="text-2xl font-bold tracking-tight text-ddd-900"
        style={{ color: "#f78002" }}
      >
        Mice
      </h2>

      <hr style={{ height: "1px", borderColor: "#f78002" }}></hr>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {(products as any).length <= 0 ? (
          <ProductCardSkeleton />
        ) : (
          (products as Product[]).map((product, index) => (
            <ProductCard key={index} data={product}></ProductCard>
          ))
        )}
      </div>
    </div>
  );
}