import { MainContext } from "@/contexts/MainContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/app/utils/formatter";
import { CartContext } from "@/contexts/CartContext";

/* eslint-disable @next/next/no-img-element */
const ProductInfoCard = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const pathName = usePathname();
  const { cartItems, handleUserCart } =
    useContext(CartContext);
  const colors = ["black", "white", "blue"];
  const [productPhotos, setProductPhotos] = useState([]) as any; 
  const [currentColor, setCurrentColor] = useState(colors[0]);

  const product = props.data;
  const blackShirt = "";
  const whiteShirt = "";
  const blueShirt = "";


  const changeActiveModel = (color: string) => {
    setCurrentColor(color as any);
  };

  const addToCart = () => {
   if (currentColor == null) return false;
   let auxProduct = JSON.parse(JSON.stringify(product));
   auxProduct.quantity = 1;
   handleUserCart('add', auxProduct, cartItems.length + 1);
  };

  useEffect(() => {
   if (product.imageSrc) setProductPhotos([product.imageSrc]);
  }, [product]);

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-zinc-900">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
            {/* <Image
              className="h-full w-full object-contain"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
              src={`${renderImage}`}
              // src={""}
              alt="Shirt"
              width={783}
              height={550}
            /> */}

            <img
              className="h-full w-full object-contain"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: "0px",
                color: "transparent",
              }}
              src={product.imageSrc}
              alt=""
            />
            <div className="absolute bottom-[15%] flex w-full justify-center">
              <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                <a
                  aria-label="Previous product image"
                  className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    ></path>
                  </svg>
                </a>
                <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                <a
                  aria-label="Next product image"
                  className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    className="h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
            {productPhotos.map((photo: any) => {
            <li className="h-20 w-20">
              <a
                aria-label="Enlarge product image"
                className="h-full w-full"
                onClick={() => changeActiveModel("black")}
              >
                <div
                  className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg hover:border hover:border-orange-600 dark:bg-black  ${
                    currentColor == "black" ? "border-orange-600 border-2" : ""
                  }`}
                >
                  <img
                    className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                    src={photo ?? ""}
                    alt="Shirt"
                    width={80}
                    height={80}
                  />
                </div>
              </a>
            </li>;
            })}

            {/* <li className="h-20 w-20">
              <a
                aria-label="Enlarge product image"
                className="h-full w-full"
                onClick={() => changeActiveModel("white")}
              >
                <div
                  className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg hover:border hover:border-orange-600 dark:bg-black ${
                    currentColor == "white" ? "border-orange-600 border-2" : ""
                  }`}
                >
                  <Image
                    className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                    src={whiteShirt}
                    alt="Shirt"
                    width={80}
                    height={80}
                  />
                </div>
              </a>
            </li>
            <li className="h-20 w-20">
              <a
                aria-label="Enlarge product image"
                className="h-full w-full"
                // href="/product/acme-geometric-circles-t-shirt?image=2"
                onClick={() => changeActiveModel("blue")}
              >
                <div
                  className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg hover:border hover:border-orange-600 dark:bg-black  ${
                    currentColor == "blue" ? "border-orange-600 border-2" : ""
                  }`}
                >
                  <Image
                    className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                    src={blueShirt}
                    alt="Shirt"
                    width={80}
                    height={80}
                  />
                </div>
              </a>
            </li> */}
          </ul>
        </div>
        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
            <h1 className="mb-2 text-5xl font-medium text-orange-600">
              {product.name}
            </h1>
            <div className="mr-auto w-auto rounded-full bg-orange-600 p-2 text-sm text-white">
              <p>
                {formatCurrency(product.currency, product.price)}
              </p>
            </div>
          </div>
          <dl className="mb-8">
            <dt className="mb-4 text-sm uppercase tracking-wide text-orange-600">
              Color
            </dt>
            <div className="flex flex-wrap gap-3">
              {colors.map((color, index) => (
                <button
                  key={index}
                  aria-disabled="false"
                  title="Color Black"
                  className={`flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm ${
                    currentColor == color
                      ? "border-2 border-orange-600 text-orange-600"
                      : "text-white"
                  }  dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white`}
                  onClick={() => changeActiveModel(color)}
                >
                  {color}
                </button>
              ))}

              {/* <button
                aria-disabled="false"
                title="Color White"
                className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-white dark:border-neutral-800 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white"
              >
                White
              </button>
              <button
                aria-disabled="true"
                title="Color Blue (Out of Stock)"
                className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-white dark:border-neutral-800 dark:bg-neutral-900 relative z-10 cursor-not-allowed overflow-hidden ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform  dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700"
              >
                Blue
              </button> */}
            </div>
          </dl>
          {(product as any)?.size != undefined && (
            <dl className="mb-8">
              <dt className="mb-4 text-sm uppercase tracking-wide text-orange-600">
                Size
              </dt>
              <dd className="flex flex-wrap gap-3">
                <button
                  aria-disabled="false"
                  title="Size XS"
                  className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-orange-600 dark:border-orange-600 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white"
                >
                  XS
                </button>
                <button
                  aria-disabled="false"
                  title="Size S"
                  className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-orange-600 dark:border-orange-600 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white"
                >
                  S
                </button>
                <button
                  aria-disabled="false"
                  title="Size M"
                  className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-orange-600 dark:border-orange-600 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white"
                >
                  M
                </button>
                <button
                  aria-disabled="false"
                  title="Size L"
                  className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-orange-600 dark:border-orange-600 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white"
                >
                  L
                </button>
                <button
                  aria-disabled="false"
                  title="Size XL"
                  className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-orange-600 dark:border-orange-600 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white"
                >
                  XL
                </button>
                <button
                  aria-disabled="false"
                  title="Size XXL"
                  className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-orange-600 dark:border-orange-600 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white"
                >
                  XXL
                </button>
                <button
                  aria-disabled="false"
                  title="Size XXXL"
                  className="flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm text-orange-600 dark:border-orange-600 dark:bg-neutral-900 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-white hover:text-white"
                >
                  XXXL
                </button>
              </dd>
            </dl>
          )}

          <div className="prose mx-auto max-w-6xl text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-6 text-sm leading-tight dark:text-white/[60%]">
            60% combed ringspun cotton/40% polyester jersey tee.
          </div>
          <button
            aria-label="Please select an option"
            aria-disabled="true"
            className={`relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white ${
              currentColor == null
                ? "cursor-not-allowed opacity-60 hover:opacity-60"
                : ""
            } `}
            onClick={() => addToCart()}
          >
            <div className="absolute left-0 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
            </div>
            Add To Cart
          </button>
          <p aria-live="polite" className="sr-only" role="status"></p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;
