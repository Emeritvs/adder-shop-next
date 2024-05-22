"use client";
import { useContext, useState } from "react";
import { MainContext } from "@/contexts/MainContext";
import { useRouter } from "next/navigation";

export default function Register() {
  const [userData, setUserData] = useState({firstname: null, lastname: null, email: null, username: null, password: null});
  const { handleToast } = useContext(MainContext);
  const { push } = useRouter();

  const handleFormValue = (e : any) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]: value});
    console.warn(userData);
  };

  const validateForm = async () => {
    const data = {
      firstname: (document.querySelector('[name="firstname"]') as HTMLInputElement).value ?? null,
      lastname: (document.querySelector('[name="lastname"]') as HTMLInputElement).value ?? null,
      email: (document.querySelector('[name="email"]') as HTMLInputElement).value ?? null,
      username: (document.querySelector('[name="username"]') as HTMLInputElement).value ?? null,
      password: (document.querySelector('[name="password"]') as HTMLInputElement).value ?? null,
    };

    if (data.firstname == null || data.firstname == "") return handleToast({ status: "info",  message: "Enter the field Name to continue", visible: true});
    if (data.lastname == null || data.lastname == "") return handleToast({ status: "info",  message: "Enter the field Last Name to continue", visible: true});
    if (data.email == null || data.email == "") return handleToast({ status: "info",  message: "Enter the field Email to continue", visible: true});
    if (data.username == null || data.username == "") return handleToast({ status: "info",  message: "Enter the field Username to continue", visible: true});
    if (data.password == null || data.password == "") return handleToast({ status: "info",  message: "Enter the field Password to continue", visible: true});

    const res = await fetch("http://localhost:3000/api/register?action=create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res) {
      const data = await res.json();
        if (data.status == 'error') return handleToast({ status: "error",  message: data.message, visible: true});

        handleToast({ status: "success", message: data.message, visible: true });
        push('/login');
    }
  };

  return (
    <div className="bg-zinc-900 w-3/5 m-auto p-12 grid border rounded dark:border-orange-600">
      <span className="font-bold w-full text-center text-3xl text-orange-600 mb-12">
        Register
      </span>

      <div className="grid grid-cols-2 gap-8">
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
            id=""
          />
        </div>

        <div className="my-6 grid w-full mx-auto col-span-1">
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
            id=""
          />
        </div>

        <div className="w-full mx-auto col-span-2">
          <button
            className="text-xl bg-orange-600 text-zinc-900 rounded p-2 float-end font-bold w-full"
            onClick={() => validateForm()}
          >
            Register
          </button>
          <a href="/register" className="text-orange-600 w-full text-end">
            Already have account? Log in
          </a>
        </div>
      </div>
    </div>
  );
}
