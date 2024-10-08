import { usePathname } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
const AdminUserListSkeleton = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const pathName = usePathname();
  const product = props.data;

  return (
    <>
      {Array.from({ length: 100 }, (_, i) => i + 1).map((id) => (
        <div key={id}>
          <div className="grid grid-cols-7  gap-4 p-8 bg-zinc-900 text-orange-600">
            <div className="col-span-1 flex items-center">
              <span className="animate-pulse rounded bg-zinc-700 text-zinc-700">
                erjgj
              </span>
            </div>

            <div
              className="col-span-1 flex items-center"
              style={{ minWidth: "60px", minHeight: "60px" }}
            >
              <span
                className="animate-pulse rounded bg-zinc-700 text-zinc-700 flex"
                style={{
                  minWidth: "60px",
                  maxWidth: "60px",
                  minHeight: "60px",
                }}
              >
                a
              </span>
            </div>

            <div className="col-span-1 flex items-center">
              <span className="animate-pulse rounded bg-zinc-700 text-zinc-700">
                johndoe@gmail.com
              </span>
            </div>

            <div className="col-span-1 flex items-center">
              <span className="animate-pulse rounded bg-zinc-700 text-zinc-700">
                johndoe@gmail.com
              </span>
            </div>

            <div className="col-span-1 flex items-center">
              <span className="animate-pulse rounded bg-zinc-700 text-zinc-700">
                erferferedfgrg
              </span>
            </div>

            <div className="col-span-1 flex items-center">
              <span className="animate-pulse rounded bg-zinc-700 text-zinc-700">
                John Doe
              </span>

              <span className="ml-2 animate-pulse rounded bg-zinc-700 text-zinc-700">
                John Doe
              </span>
            </div>

            <div className="col-span-1 flex items-center"></div>
          </div>

          <hr className="border-orange-600"></hr>
        </div>
      ))}
    </>
  );
};

export default AdminUserListSkeleton;
