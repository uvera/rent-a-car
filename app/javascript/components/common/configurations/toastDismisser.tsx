import { useEffect } from "react";

type ToastDismisserProps = {
  timeout?: number;
  close: () => void;
};
const ToastDismisser = ({ timeout, close }: ToastDismisserProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, timeout ?? 25000);

    return () => clearTimeout(timer);
  }, []);
  return null;
};

export default ToastDismisser;
