/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Product } from "@/app/interfaces/products-interface";
import ProductCard from "@/components/product-card/product-card";
import ProductCardSkeleton from "@/components/products-list-skeleton";
import { MainContext } from "@/contexts/MainContext";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { UserData } from "../interfaces/users-interface";
import _debounce from "lodash/debounce";
import useDebounce from "../utils/useDebounce";
import ProductDialog from "@/components/product-dialog/product-dialog";
import UserDialog from "@/components/user-dialog/user-dialog";
import AdminItemListSkeleton from "@/components/admin-product-list-skeleton/admin-product-list-skeleton";
import AdminProductListSkeleton from "@/components/admin-product-list-skeleton/admin-product-list-skeleton";
import AdminUserListSkeleton from "@/components/admin-user-list-skeleton/admin-user-list-skeleton";
import { ProductContext } from "@/contexts/ProductContext";
import Image from "next/image";
import { UserContext } from "@/contexts/UserContext";

export default function AdminPage() {
  const recoverModalProps = {
    title: "Email enviado",
    subtitle:
      "Uma mensagem foi enviada para seu endereço de email, verifica a caixa de entrada para continuar com recuperação de senha.",
    action: "alert",
    status: "success",
  };
  const pathName = usePathname();
  const { push } = useRouter();
  const [products, setProducts] = useState([] as Product[]);
  const [users, setUsers] = useState([] as UserData[]);
  const [userDialogVisibility, setUserDialogVisibility] = useState(false);
  const {
    userData,
    colorMode,
    changeColorMode,
    currentPageTitle,
    changePageTitle,
    handleToast,
    getUserData,
  } = useContext(MainContext);
  const {userDialogOpen, userModal} = useContext(UserContext);
  const {productDialogOpen, productModal, currentProduct, handleCurrentProduct} = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("users");
  const [productSearch, setProductSearch] = useState("");
  //const [currentProduct, setCurrentProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  type Context = {
    [key: string]: any;
  };

  const handleSearch = (e : any) => setProductSearch(e.target.value);
  useDebounce(
    () => {
      if (currentTab == "products") {
        fetchProductsData();
      }
    },
    [productSearch],
    800
  );


  const deleteUser = async (user : any) => {
    try {
      setUsers([]);
      const res = await fetch(`http://localhost:3000/api/users/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res) {
        const data = await res.json();
        fetchUsersData();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsersData = async () => {
    try {
      setUsers([]);
      const res = await fetch(`http://localhost:3000/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsData = async () => {
    try {
      setProducts([]);
      const params = (productSearch != null && productSearch != "") ? `?name=${productSearch}` : "";
      const res = await fetch(`http://localhost:3000/api/products${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addNewRegister = async (item : any) => {
    if (currentTab == "users") {
      setCurrentUser(item);
      userModal("show");
    } else {
      //setCurrentProduct(item);
      handleCurrentProduct(item.data);
      productModal("show");
    }
  }

  const handleDialogDismiss = (tab : String) => {
    if (tab == "users") {
      fetchUsersData();
    }
    if (tab == "products") {
      setProductSearch('');
      fetchProductsData();
    }
  };

  useEffect(() => {
    if (currentTab == "users") fetchUsersData();
    if (currentTab == "products") fetchProductsData();
  }, [currentTab]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div>
        <button
          className="rounded-md bg-transparent p-2 m-2 ring-orange-600 ring-1 text-orange-600 text-sm"
          onClick={() => setCurrentTab("users")}
        >
          Users
        </button>
        <button
          className="rounded-md bg-transparent p-2 m-2 ring-orange-600 ring-1 text-orange-600 text-sm"
          onClick={() => setCurrentTab("products")}
        >
          Products
        </button>
      </div>

      <hr className="border-orange-600"></hr>

      <div className="w-full">
        <button
          id="add-button"
          className="ml-auto rounded-md bg-orange-600 p-2 m-2 text-white text-sm"
          onClick={() => addNewRegister({ action: "add", data: {} })}
        >
          Add
        </button>
      </div>

      <hr className="border-orange-600"></hr>
      {currentTab == "users" && (
        <div id="users" className="mt-6 mb-2 p-4 bg-zinc-900">
          <div className="grid grid-cols-6 bg-zinc-900 text-orange-600 ">
            <div className="col-span-1">#</div>
            <div className="col-span-1">Username</div>
            <div className="col-span-1">Email</div>
            <div className="col-span-1">Role</div>
            <div className="col-span-1">Name</div>
            <div className="col-span-1">&nbsp;</div>
          </div>

          {users.length <= 0 ? (
            <AdminUserListSkeleton />
          ) : (
            users.map((user, index) => (
              <div key={index}>
                <div className="grid grid-cols-6 p-8 bg-zinc-900 text-orange-600">
                  <div className="col-span-1">{index}</div>
                  <div className="col-span-1">{user.username}</div>
                  <div className="col-span-1">{user.email}</div>
                  <div className="col-span-1">{user.role}</div>
                  <div className="col-span-1">
                    {user.firstname} {user.lastname}
                  </div>
                  <div className="col-span-1">
                    <button
                      className="bg-orange-600 text-white p-2 rounded"
                      onClick={() =>
                        addNewRegister({
                          action: "edit",
                          type: "user",
                          data: user,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 bg-orange-600 text-white p-2 rounded"
                      onClick={() => deleteUser(user)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <hr className="border-orange-600"></hr>
              </div>
            ))
          )}

          <UserDialog
            open={userDialogOpen}
            user={currentUser}
            onDismiss={() => handleDialogDismiss("users")}
          ></UserDialog>
        </div>
      )}

      {currentTab == "products" && (
        <div id="products" className="mt-6 mb-2 p-4 bg-zinc-900">
          <div className="my-6 flex w-full mx-auto focus:text-white">
            <label className="text-lg font-medium items-center text-orange-600 px-2 mx-6 bg-zinc-900 ">
              Pesquisar
            </label>
            <input
              className="w-full h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600"
              type="text"
              name="username"
              id=""
              value={productSearch}
              onChange={handleSearch}
            />
          </div>

          <hr className="border-orange-600"></hr>

          {products.length <= 0 ? (
            <AdminProductListSkeleton />
          ) : (
            products.map((product, index) => (
              <div key={index}>
                <div className="justify-between mb-6 rounded-lg bg-zinc-900 text-orange-600 p-6 shadow-md sm:flex sm:justify-start">
                  <Image
                    src={product.imageSrc ?? ''}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40 object-cover"
                    style={{minWidth: '120px', maxWidth: '120px', minHeight: '120px', maxHeight: '120px'}}
                    width={120}
                    height={120}
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold">{product.name}</h2>
                      <p className="mt-1 text-xs">{product.name}</p>
                      <p className="mt-1 text-xs">{product.price}</p>
                    </div>

                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <button
                        className="bg-orange-600 text-white p-2 rounded"
                        onClick={() =>
                          addNewRegister({
                            action: "edit",
                            type: "product",
                            data: product,
                          })
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="border-orange-600"></hr>
              </div>
            ))
          )}

          <ProductDialog
            open={productDialogOpen}
            product={currentProduct}
            onDismiss={() => handleDialogDismiss("products")}
          ></ProductDialog>
        </div>
      )}
    </div>
  );
}
