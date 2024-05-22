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
          <div className="grid grid-cols-5 p-8 bg-zinc-900 text-orange-600">
            <div className="col-span-1">
              <span className="animate-pulse bg-zinc-700 text-zinc-700">
                {id}
              </span>
            </div>
            <div className="col-span-1">
              <span className="animate-pulse bg-zinc-700 text-zinc-700">
                jdoe
              </span>
            </div>
            <div className="col-span-1 animate-pulse bg-zinc-700 text-zinc-700">
              <span className="animate-pulse bg-zinc-700 text-zinc-700">
                johndoe@gmail.com
              </span>
            </div>
            <div className="col-span-1 animate-pulse bg-zinc-700 text-zinc-700">
              <span className="animate-pulse bg-zinc-700 text-zinc-700">
                User
              </span>
            </div>
            <div className="col-span-1 animate-pulse bg-zinc-700 text-zinc-700">
              <span className="animate-pulse bg-zinc-700 text-zinc-700">
                John Doe
              </span>
            </div>
          </div>

          <hr className="border-orange-600"></hr>
        </div>
      ))}
    </>
  );
};

export default AdminUserListSkeleton;
