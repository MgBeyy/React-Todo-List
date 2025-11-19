import { useState, createContext, useContext } from "react";
import SimpleSnackbar from "../Components/SimpleSnackbar";

export let ToastContext = createContext({});

export let ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showToastBar(message) {
    setMessage(message);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToastBar }}>
      <SimpleSnackbar open={open} handleClose={handleClose} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
