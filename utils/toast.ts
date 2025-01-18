import { toast , ToastOptions } from "react-toastify";

// Configure the toast options
const toastConfig:ToastOptions = {
  position: "top-center",
  autoClose: 1000, // Auto close after 3 seconds
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  className: "custom-toast", 

};

// Helper functions for different toast types
export const showSuccessToast = (message: string) => {
  toast.success(message, toastConfig);
};

export const showErrorToast = (message: string) => {
  toast.error(message, toastConfig);
};

export const showInfoToast = (message: string) => {
  toast.info(message, toastConfig);
};

export const showWarningToast = (message: string) => {
  toast.warn(message, toastConfig);
};