import { Bounce, ToastContainerProps } from "react-toastify";

export const toastOptions: ToastContainerProps = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  theme: "light",
  transition: Bounce,
};
