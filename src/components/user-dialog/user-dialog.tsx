/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { UserContext } from "@/contexts/UserContext";
import { MainContext } from "@/contexts/MainContext";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import noImage from "../../../public/no-image-user.jpg";
import { fileToBase64 } from "@/app/utils/encoders";

/* eslint-disable @next/next/no-img-element */
const UserDialog = (
  props: any,
  //{ children }: { children: React.ReactNode }
) => {
  const { children, open, user, onDismiss, ...rest } = props;

  const {
    colorMode,
    changeColorMode,
    currentPageTitle,
    changePageTitle,
    handleToast,
  } = useContext(MainContext);
  const { userModal, currentUser, handleCurrentUser } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(open);
  const [userImage, setUserImage] = useState(noImage) as any;
  const [userData, setUserData] = useState(user) as any;
  
    useEffect(() => {

      setIsVisible(open);
      handleCurrentUser(user);
      setUserData(user);
      setUserImage(user?.imageSrc ?? noImage);

    }, [open, user]);
    
  const closeModal = () => {
   setUserImage(noImage);
   userModal("hide");
   onDismiss();
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const auxUser = { ...currentUser, [name]: value };
      handleCurrentUser(auxUser);
    };
    
    const imageChange = async (event: any) => {
      if (event.target.files && event.target.files.length > 0) {
        let image = event.target.files[0];
        const base64Image = await fileToBase64(image);

        setUserData((prevData: any) => ({
          ...prevData,
          imageSrc: `data:@file/octet-stream;base64,${base64Image}`,
        }));

        setUserImage(URL.createObjectURL(image));
      }
    };

  const selectUserImage = () => {
    let fileInput: any = document.querySelector("#user-photo");
    fileInput.click();
  };

  const updateUser = async () => {
    const userDataAux = currentUser;
    userDataAux.imageSrc = userImage ?? null;


    if (userDataAux.firstname == null || userDataAux.firstname == "")
      return handleToast({
        status: "info",
        message: "Enter the field Name to continue",
        visible: true,
      });

    if (userDataAux.lastname == null || userDataAux.lastname == "")
      return handleToast({
        status: "info",
        message: "Enter the field Last Name to continue",
        visible: true,
      });
    if (userDataAux.email == null || userDataAux.email == "")
      return handleToast({
        status: "info",
        message: "Enter the field Email to continue",
        visible: true,
      });
    if (userDataAux.username == null || userDataAux.username == "")
      return handleToast({
        status: "info",
        message: "Enter the field Username to continue",
        visible: true,
      });

    const action =
      currentUser._id && currentUser._id != null ? "edit" : "create";

    const res = await fetch(`http://localhost:3000/api/register?action=${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (res) {
      const data = await res.json();
      if (data.status == "error")
        return handleToast({
          status: "error",
          message: data.message,
          visible: true,
        });

      closeModal();
      handleToast({ status: "success", message: data.message, visible: true });
    }
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
      onClick={() => closeModal()}
    >
      <div
        className={`fixed inset-0 bg-zinc-800 bg-opacity-75 transition-opacity`}
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className={`relative transform overflow-hidden rounded-lg bg-zinc-900 text-left shadow-xl transition-all sm:my-8 w-2/3${
              isVisible
                ? "ease-out duration-300 translate-y-0 sm:scale-100 opacity-100"
                : "ease-in duration-200 translate-y-4 sm:translate-y-0 sm:scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-zinc-900 text-orange-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-orange-600"
                    id="modal-title"
                  >
                    {userData?._id && userData?._id != null ? "Edit" : "New"}{" "}
                    user
                  </h3>
                  <hr className="border-orange-600"></hr>

                  <div className="m-auto grid">
                    <div className="grid grid-cols-2 gap-8">
                      <div
                        className="col-span-1 grid grid-cols-1 p-4 w-full"
                        // style={{ width: "150px", height: "150px" }}
                      >
                        <Image
                          className="border border-orange-600"
                          // src={productImage}
                          src={userImage}
                          alt=""
                          width={300}
                          height={300}
                          style={{
                            aspectRatio: "1/1",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          className="bg-orange-600 text-white text-sm p-2 rounded"
                          onClick={() => selectUserImage()}
                        >
                          Escolher imagem
                        </button>
                        <input
                          type="file"
                          name="user-photo"
                          id="user-photo"
                          className="hidden"
                          onChange={imageChange}
                        />
                      </div>

                      <div className="col-span-1 grid grid-cols-2 gap-8">
                        <div className="my-6 grid w-full mx-auto col-span-1 ">
                          <label
                            className="text-lg font-medium text-orange-600 absolute px-2 mx-6 bg-zinc-900 "
                            style={{
                              width: "fit-content",
                              transform: "translate(0%, -50%)",
                              zIndex: "10",
                            }}
                          >
                            First name
                          </label>
                          <input
                            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600 "
                            type="text"
                            name="firstname"
                            value={currentUser?.firstname ?? ""}
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
                            Last name
                          </label>
                          <input
                            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600 "
                            type="text"
                            name="lastname"
                            value={currentUser?.lastname ?? ""}
                            onChange={handleChange}
                            id=""
                          />
                        </div>

                        <div className="my-6 grid w-full col-span-2 mx-auto ">
                          <label
                            className="text-lg font-medium text-orange-600 absolute px-2 mx-6 bg-zinc-900 "
                            style={{
                              width: "fit-content",
                              transform: "translate(0%, -50%)",
                              zIndex: "10",
                            }}
                          >
                            Email
                          </label>
                          <input
                            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600 "
                            type="text"
                            name="email"
                            value={currentUser?.email ?? ""}
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
                            Username
                          </label>
                          <input
                            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600 "
                            type="text"
                            name="username"
                            value={currentUser?.username ?? ""}
                            onChange={handleChange}
                            id=""
                          />
                        </div>
                      </div>

                      {/* <div className="my-6 grid w-full mx-auto col-span-1">
                        <label
                          className="text-lg font-medium text-orange-600 absolute px-2 mx-6 bg-zinc-900 "
                          style={{
                            width: "fit-content",
                            transform: "translate(0%, -50%)",
                            zIndex: "10",
                          }}
                        >
                          Password
                        </label>
                        <input
                          className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600 "
                          type="password"
                          name="password"
                          value={userInfo?.password}
                          onChange={handleChange}
                          id=""
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-orange-600"></hr>
            <div className="bg-zinc-900 px-4 py-3 sm:flex sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center items-center rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-orange-600 hover:text-white shadow-sm ring-1 ring-inset ring-orange-600 hover:bg-orange-600 sm:mt-0 sm:w-auto"
                onClick={() => closeModal()}
              >
                Cancel
              </button>

              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                onClick={updateUser}
              >
                {currentUser?._id && currentUser?._id != null
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

export default UserDialog;
