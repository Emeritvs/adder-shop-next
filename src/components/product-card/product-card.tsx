import { MainContext } from "@/contexts/MainContext";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import './product-card.css';
import Link from "next/link";
import { formatCurrency } from "@/app/utils/formatter";

/* eslint-disable @next/next/no-img-element */
const ProductCard = (props : any, { children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
    const { colorMode, changeColorMode, currentPageTitle, changePageTitle } =
      useContext(MainContext);

  const product = props.data;

  return (
    <div
      key={product._id}
      className="adder-product-card group relative p-2  hover:bg-orange-600 text-orange-600 hover:text-zinc-950"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-100 lg:h-80">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className={`text-sm hover:font-bold`}>
            <Link href={`/products/${product._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className={`mt-1 text-sm hover:font-bold`}>{product.color}</p>
        </div>
        <p className={`text-lg font-bold`}>
          {formatCurrency("real", product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
