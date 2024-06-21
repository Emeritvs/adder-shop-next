"use client";
import { Product } from "@/app/interfaces/products-interface";
import { MainContext } from "@/contexts/MainContext";
import { ProductContext } from "@/contexts/ProductContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { fileToBase64 } from "@/app/utils/encoders";
import noImage from '../../../public/no-image.jpg';

/* eslint-disable @next/next/no-img-element */
const ProductDialog = (
  props: any,
  // { children }: { children: React.ReactNode }
) => {
  const { children, open, product, onDismiss, ...rest } = props;
  const { colorMode, changeColorMode, currentPageTitle, changePageTitle, toastData, handleToast} =
    useContext(MainContext);
  const { productModal, currentProduct, handleCurrentProduct } = useContext(ProductContext);
  const [productImage, setProductImage] = useState(noImage) as any;

  const [isVisible, setIsVisible] = useState(open);
      useEffect(() => {
        handleCurrentProduct(product)
        setIsVisible(open);
        setProductImage(currentProduct?.imageSrc ?? noImage);
      }, [open, product]);

    const closeModal = () => {
     setProductImage(noImage);
     productModal("hide");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;
       const auxProduct = currentProduct;
       auxProduct[name] = value;
       handleCurrentProduct(auxProduct);
    };

  const updateProduct = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentProduct)
        }
      );

      if (res) {
        const data = await res.json();
        productModal('hide');
        if (data.status == 'success') {
          onDismiss();
          handleToast({ status: data.status, message: data.message, visible: true });
        }
        if (data.status == 'error') handleToast({ status: data.status, message: data.message, visible: true });
      }
    } catch (error) {
      console.error(error);
      handleToast({ status: 'error', message: error, visible: true });
    } finally {
      //setLoading(false);
    }
  };

  const imageChange  = (event : any) => {
    if (event.target.files && event.target.files.length > 0) {
      let image = event.target.files[0];

      fileToBase64(image).then((res) => {
        const auxProduct = currentProduct;
        auxProduct.imageSrc = `data:@file/octet-stream;base64,${res}`;
        handleCurrentProduct(auxProduct);
      });

      setProductImage(URL.createObjectURL(image));
    }
  };

  const selectProductImage = () => {
   let fileInput : any = document.querySelector('#product-photo');
   fileInput.click();
  };

  return (
    <div
      id="user-dialog"
      className={`relative z-10 ${
        isVisible
          ? "ease-out duration-300 opacity-100 visible"
          : "ease-in duration-200 opacity-0 invisible"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`fixed inset-0 bg-zinc-800 bg-opacity-75 transition-opacity`}
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-zinc-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${
              isVisible
                ? "ease-out duration-300 translate-y-0 sm:scale-100 opacity-100"
                : "ease-in duration-200 translate-y-4 sm:translate-y-0 sm:scale-95 opacity-0"
            }`}
          >
            <div className="bg-zinc-900 text-orange-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-orange-600"
                    id="modal-title"
                  >
                    {currentProduct?._id && currentProduct?._id != null
                      ? "Edit"
                      : "New"}{" "}
                    product
                  </h3>
                  <hr className="border-orange-600"></hr>

                  <div className="m-auto grid">
                    <div className="grid grid-cols-2 gap-8">
                      <div
                        className="col-span-1 grid grid-cols-1"
                        style={{ width: "150px", height: "150px" }}
                      >
                        <Image
                          className="border border-orange-600"
                          src={productImage}
                          alt=""
                          width={150}
                          height={150}
                          style={{
                            maxHeight: "150px",
                            maxWidth: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          className="bg-orange-600 text-white text-sm p-2 rounded"
                          onClick={() => selectProductImage()}
                        >
                          Escolher imagem
                        </button>
                        <input
                          type="file"
                          name="product-photo"
                          id="product-photo"
                          className="hidden"
                          onChange={imageChange}
                        />
                      </div>

                      <div className="col-span-1">
                        <div className="my-6 grid w-full mx-auto col-span-1 ">
                          <label
                            className="text-lg font-medium text-orange-600 absolute px-2 mx-6 bg-zinc-900 "
                            style={{
                              width: "fit-content",
                              transform: "translate(0%, -50%)",
                              zIndex: "10",
                            }}
                          >
                            Product name
                          </label>
                          <input
                            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600 "
                            type="text"
                            name="name"
                            value={currentProduct?.name}
                            onChange={handleChange}
                            id=""
                          />
                        </div>

                        <div className="my-6 grid w-full col-span-1 mx-auto ">
                          <label
                            className="text-lg font-medium text-orange-600 absolute px-2 mx-6 bg-zinc-900 "
                            style={{
                              width: "fit-content",
                              transform: "translate(0%, -50%)",
                              zIndex: "10",
                            }}
                          >
                            Price
                          </label>
                          <input
                            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600 "
                            type="text"
                            name="price"
                            value={currentProduct?.price}
                            onChange={handleChange}
                            id=""
                          />
                        </div>

                        <div className="my-6 grid w-full mx-auto col-span-1 ">
                          <label
                            className="text-lg font-medium text-orange-600 absolute px-2 mx-6 bg-zinc-900 "
                            style={{
                              width: "fit-content",
                              transform: "translate(0%, -50%)",
                              zIndex: "10",
                            }}
                          >
                            Type
                          </label>
                          <input
                            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600 "
                            type="text"
                            name="type"
                            value={currentProduct?.type}
                            onChange={handleChange}
                            id=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-orange-600"></hr>
            <div className="bg-zinc-900 px-4 py-3 sm:flex sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => closeModal()}
              >
                Cancel
              </button>

              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                onClick={() => updateProduct()}
              >
                {currentProduct?._id && currentProduct?._id != null
                  ? "Update"
                  : "Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDialog;
