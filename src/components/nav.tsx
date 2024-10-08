/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
import { MainContext } from "@/contexts/MainContext";
import AdderLogo from "../../public/adder-logo.png";
import { UserData } from "@/app/interfaces/users-interface";
import { CartContext } from "@/contexts/CartContext";
import { getUserDataStorage } from "@/app/utils/storage";
import noImage from "../../public/blank.jpg";

export default function Nav() {
  const { userData, handleUserData, getUserData, isLogged, isAdmin } = useContext(MainContext);
  const { cartSidebar } = useContext(CartContext);
  const { push } = useRouter();
  const [userInfo, setUserInfo] = useState({
    id: null,
    email: null,
    username: null,
    password: null,
    firstname: null,
    lastname: null,
  }) as any;
  const [isProductMenuActive, setIsProductMenuActive] = useState(false);
  const [isUserMenuActive, setIsUserMenuActive] = useState(false);
  const productMenu = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  const signOut = () => {
      handleUserData({});
      push("/login");
  }

  useEffect(() => {
    setIsMounted(true);
    setUserInfo(getUserData())
  }, []);
  
  if (!isMounted) return null;
  return (
    <nav className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  className="h-16 w-16"
                  src={AdderLogo}
                  alt="Adder Shop logo"
                ></Image>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/products?type=keyboard"
                  className="rounded-md px-3 py-2 text-lg font-bold text-orange-600 cursor-pointer"
                  aria-current="page"
                  onClick={() => setIsProductMenuActive((prev) => !prev)}
                >
                  Keyboards
                </Link>

                <Link
                  href="/products?type=mice"
                  className="rounded-md px-3 py-2 text-lg font-bold text-orange-600 cursor-pointer"
                  aria-current="page"
                  onClick={() => setIsProductMenuActive((prev) => !prev)}
                >
                  Mice
                </Link>

                <Link
                  href="/contact"
                  className="rounded-md px-3 py-2 text-lg font-bold text-orange-600"
                  aria-current="page"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {!isLogged && (
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-lg font-bold text-orange-600 cursor-pointer"
                  aria-current="page"
                >
                  Login
                </Link>
              )}

              {isLogged && (
                <div
                  className="relative ml-3"
                  onMouseEnter={() => setIsUserMenuActive(true)}
                  onMouseLeave={() => setIsUserMenuActive(false)}
                >
                  <button
                    type="button"
                    className="relative flex max-w-xs items-center rounded bg-transparent text-sm"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="px-3 py-2 text-lg font-bold text-orange-600 ">
                      {userInfo.username}
                    </span>
                  </button>

                  <div
                    id="desktop-dropdown"
                    className={`absolute right-0 z-10 w-48 origin-top-right rounded-md bg-zinc-900 py-1 shadow-lg ring-1 ring-orange-600 ring-opacity-25 focus:outline-none ease-in-out duration-200 ${
                      isUserMenuActive ? "block" : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    onMouseEnter={() => setIsUserMenuActive(true)}
                  >
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-sm text-orange-600 font-medium"
                      role="menuitem"
                      id="user-menu-item-0"
                    >
                      My Account
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin-page"
                        className="block px-4 py-2 text-sm text-orange-600 font-medium"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Admin
                      </Link>
                    )}

                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-orange-600 font-medium"
                      role="menuitem"
                      id="user-menu-item-2"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </Link>
                  </div>
                </div>
              )}

              <span
                className="rounded-md px-3 py-2 text-lg font-bold text-orange-600 cursor-pointer"
                aria-current="page"
                onClick={() => cartSidebar("show")}
              >
                Cart
              </span>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md bg-orange-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* TODO MOBILE
       */}
      <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-orange-600">
          <Link
            href="#"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Products
          </Link>
        </div>
        <div className="border-t border-gray-700 pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              {/* <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> */}
              <Image src={noImage} alt="Shirt" width={100} height={100} />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                Tom Cook
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                tom@example.com
              </div>
            </div>
            <button
              type="button"
              className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              onClick={() => setIsUserMenuActive((prev) => !prev)}
            >
              <span id="testando" className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          </div>
          <div id="mobile-dropdown" className="mt-3 space-y-1 px-2">
            <Link
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Your Profile
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Settings
            </Link>
            <Link
              href="#"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// export default Nav;
