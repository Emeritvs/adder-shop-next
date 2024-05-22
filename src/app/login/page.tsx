"use client";
import { MainContext } from "@/contexts/MainContext";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";

export default function Login() {
  const { handleToast, handleUserData } = useContext(MainContext);
  const { push } = useRouter();

  const tryLogin = async () => {

    try {
      const userLogin = {
        username:
          (document.querySelector('[name="username"]') as HTMLInputElement)
            .value ?? "",
        password:
          (document.querySelector('[name="password"]') as HTMLInputElement)
            .value ?? "",
      };

      if (userLogin.username == null || userLogin.username == "") return handleToast({ status: "info",  message: "Informe o login para continuar", visible: true});
      if (userLogin.password == null || userLogin.password == "") return handleToast({ status: "info",  message: "Informe a senha para continuar", visible: true});

      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin)
      });

      if (res) {
        const result = await res.json();
        if (result.status == 'error') return handleToast({ status: "error",  message: result.message, visible: true});

        handleToast({ status: "success", message: result.message, visible: true });
        handleUserData({...result.data, id: result.data["_id"] });
        push('/');
      }
    
    } catch (error) {
      console.error(error);
    }
    finally {
      //setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-zinc-900 w-1/2 m-auto p-6 grid border rounded dark:border-orange-600">
        <span className="font-bold w-full text-center text-3xl text-orange-600 mb-12">
          Login
        </span>

        <div className="my-6 grid w-1/2 mx-auto focus:text-white">
          <label
            className="text-lg font-medium text-orange-600 absolute px-2 mx-6 bg-zinc-900 "
            style={{
              width: "fit-content",
              transform: "translate(0%, -50%)",
              zIndex: "10",
            }}
          >
            Usuário
          </label>
          <input
            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600"
            type="text"
            name="username"
            id=""
          />
        </div>

        <div className="my-6 grid w-1/2 mx-auto">
          <label
            className="text-lg font-medium text-orange-600 absolute px-2 mx-6 bg-zinc-900 hover:text-white"
            style={{
              width: "fit-content",
              transform: "translate(0%, -50%)",
              zIndex: "10",
            }}
          >
            Senha
          </label>
          <input
            className="h-12 p-2 bg-zinc-900 border border-orange-600 text-orange-600"
            type="password"
            name="password"
            id=""
          />
          <a href="/recover" className="text-orange-600 w-full text-end">
            Esqueci a senha
          </a>
        </div>

        <div className="w-1/2 mx-auto">
          <button
            className="text-xl bg-orange-600 text-zinc-900 rounded p-2 float-end font-bold w-full"
            onClick={() => tryLogin()}
          >
            Acessar
          </button>
          <a href="/register" className="text-orange-600 w-full text-end">
            Criar conta
          </a>
        </div>
      </div>
    </>
  );
}
