import { usePathname } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
const AdminProductListSkeleton = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const pathName = usePathname();
  const product = props.data;

  return (
    <>
      {Array.from({ length: 100 }, (_, i) => i + 1).map((id) => (
        <div key={id}>
          <div className="justify-between mb-6 rounded-lg bg-zinc-900 text-orange-600 p-6 shadow-md sm:flex sm:justify-start">
            <div className="animate-pulse overflow-hidden rounded-md bg-zinc-700  group-hover:opacity-75 h-40 w-40">
              {/* <img
              src={''}
              alt={''}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            /> */}
            </div>
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold animate-pulse bg-zinc-700 text-zinc-700 rounded">
                  wedgwerggreg
                </h2>
                <p className="mt-1 text-xs animate-pulse bg-zinc-700 text-zinc-700 rounded">
                  ergergerger
                </p>
                <p className="mt-1 text-xs animate-pulse bg-zinc-700 text-zinc-700 rounded">
                  20
                </p>
              </div>

              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"></div>
            </div>
          </div>

          <hr className="border-orange-600"></hr>
        </div>
      ))}
    </>
  );
};

export default AdminProductListSkeleton;
