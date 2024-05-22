"use client";
import { useRouter } from "next/router";

export default function OrderProduct() {
  const handleClick = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    router.replace("/blog");
  };

  return (
    <>
      <h1>Orser product</h1>
      <button onClick={handleClick}>Place order</button>
    </>
  );
};