import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export default function ToastifyPortal({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
