import { usePathname } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
const ProductCardSkeleton = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const pathName = usePathname();
  const product = props.data;

  return (
    <>
      {Array.from({ length: 100 }, (_, i) => i + 1).map((id) => (
        <div key={id} className="group relative">
          <div className="animate-pulse aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-zinc-700 lg:aspect-none group-hover:opacity-75 lg:h-80">
            {/* <img
              src={''}
              alt={''}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            /> */}
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3
                className={`animate-pulse bg-slate-700 text-slate-700 rounded text-sm`}
              >
                <a href={``}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {`Example of product to Skeleton`}
                </a>
              </h3>
              <p
                className={`animate-pulse bg-slate-700 text-slate-700 rounded mt-1 text-sm`}
              >{`White`}</p>
            </div>
            <p
              className={`animate-pulse bg-slate-700 text-slate-700 rounded text-sm font-medium`}
              style={{height: 'fit-content'}}
            >
              {`200`}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCardSkeleton;
