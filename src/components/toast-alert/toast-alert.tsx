import { MainContext } from '@/contexts/MainContext';
import { useContext } from 'react';
import './toast-alert.css';

const ToastAlert = (
  props: any,
  { children }: { children: React.ReactNode }
) => {
  const { toastData, handleToast } = useContext(MainContext);
  const toastBg = () => {
    const options : any = {
      info: "bg-orange-600",
      warning: "bg-yellow-500",
      success: "bg-green-500",
      error: "bg-red-500",
    };
    
    return options[toastData.status] ?? 'bg-green-500';
  };

  const closeToast = () => {
    handleToast({...toastData, visible: false});
  }

  return (
    <>
  {/* <!--Toast--> */}
    <div className={`alert-toast ${toastData.visible == true ? 'block' : 'block' } fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm`}>
      <input type="checkbox" className="hidden" id="footertoast" checked={!toastData.visible} onChange={() => handleToast({...toastData, visible: false}) }/>

      <label className={`close cursor-pointer flex items-start justify-between w-full p-2 ${toastBg()} h-24 rounded shadow-lg font-medium text-white`} title="close" htmlFor="footertoast">
       {toastData.message}

        <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" onClick={() => closeToast()}>
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </label>
    </div>
    </>
  );
}

export default ToastAlert;