import { MainContext } from "@/contexts/MainContext";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import './product-card.css';

/* eslint-disable @next/next/no-img-element */
const ProductCard = (props : any, { children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
    const { colorMode, changeColorMode, currentPageTitle, changePageTitle } =
      useContext(MainContext);

  const product = props.data;

      const containerStyle = {
        // border: "4px solid",
        // borderRadius: "5px",
        color: "#f78002",
        // margin: "0 10% 0 10%",
        backgroundColor: " rgb(24 24 27 / 0.8)",
        height: "100vh",
      };

  return (
    <div
      key={product._id}
      className="adder-product-card group relative p-2  hover:bg-orange-600 text-orange-600 hover:text-zinc-950"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className={`text-sm`}>
            <a href={`/products/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className={`mt-1 text-sm`}>{product.color}</p>
        </div>
        <p className={`text-sm font-medium`}>{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
