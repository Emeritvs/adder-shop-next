/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { MainContext } from "@/contexts/MainContext";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Context, useContext, useEffect, useState } from "react";
import { Product } from "@/app/interfaces/products-interface";
import blackShirt from "../../../../../public/products/t-shirt-1.avif";
import whiteShirt from "../../../../../public/products/t-shirt-2.avif";
import blueShirt from "../../../../../public/products/t-shirt-circles-blue.avif";
import ProductInfoCard from "@/components/product-info-card/product-info-card";

export default function MiceDetails({
  params,
}: {
  params: { productId: string };
}) {
  const { colorMode, changeColorMode } = useContext(MainContext);
  const pathName = usePathname();
  const paramsNext = useParams();
  const [currentColor, setCurrentColor] = useState("white");
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({} as Product);
  const productId = paramsNext?.miceId;

  const changeActiveModel = (color: string) => {
    setCurrentColor(color);
    console.warn(currentColor);
  };

  const formatCurrency = (currency?: string, price?: any) => {
    let finalCurrency = currency ?? "dolar";
    let finalPrice = price ?? "999999";

    switch (finalCurrency) {
      case "dolar":
        finalPrice = `$${price} USD`;
        break;
      case "real":
        finalPrice = `$${price} BRL`;
        break;
      default:
        finalPrice = `$${price} USD`;
        break;
    }

    return finalPrice;
  };

  const showCurrentColor = () => {
    let color = null;
    switch (currentColor) {
      case "black":
        color = blackShirt;
        break;
      case "white":
        color = whiteShirt;
        break;
      case "blue":
        color = blueShirt;
        break;
      default:
        color = blackShirt;
        break;
    }

    return color;
  };

  const renderImage = () => {
    let imageSrc = product.imageSrc;
    const imageData = imageSrc?.split(",")[1];

    return imageData;
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products?id=${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res) {
        const data = await res.json();
        const auxData = data[0];
        setProduct(auxData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    {loading == true ? (
      <h1>Carregando</h1>
    ) : (
      <ProductInfoCard  data={product} />
    )}
    </>
  );
}

