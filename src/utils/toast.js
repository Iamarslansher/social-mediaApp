import { toast } from "react-toastify";

const options = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const successToast = (msg) => toast.success(msg, options);

export const errorToast = (msg) => toast.error(msg, options);

export const warningToast = (msg) => toast.warning(msg, options);

export const infoToast = (msg) => toast.info(msg, options);

export const loadingToast = (msg = "Please wait...") =>
  toast.loading(msg, options);

export const updateToast = (id, msg, type = "success") => {
  toast.update(id, {
    render: msg,
    type,
    isLoading: false,
    autoClose: 3000,
  });
};
