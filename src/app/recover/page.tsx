import MessageDialog from "@/components/message-dialog/message-dialog";

export default function Recover() {
  const recoverModalProps = {
    title: 'Email enviado',
    subtitle: 'Uma mensagem foi enviada para seu endereço de email, verifica a caixa de entrada para continuar com recuperação de senha.',
    action: 'alert',
    status: 'success'
  };
  return (
    <>
      <div className="bg-zinc-900 w-1/2 m-auto p-6 grid border rounded dark:border-orange-600">
        <span className="font-bold w-full text-center text-3xl text-orange-600 mb-12">
          Recover Password
        </span>

        <div className="my-6 grid w-1/2 mx-auto focus:text-white">
          <label
            className="text-lg font-medium text-orange-600 absolute p-2 mx-6 bg-zinc-900 "
            style={{
              width: "fit-content",
              transform: "translate(0%, -50%)",
              zIndex: "10",
            }}
          >
            Email
          </label>
          <input
            className="h-12 bg-zinc-900 border border-orange-600"
            type="text"
            name="email"
            id=""
          />
        </div>

        <div className="w-1/2 mx-auto">
          <button className="text-xl bg-orange-600 text-zinc-900 rounded p-2 float-end font-bold w-full">
            Recuperar
          </button>
        </div>
      </div>

      <MessageDialog data={recoverModalProps}></MessageDialog>
    </>
  );
}
