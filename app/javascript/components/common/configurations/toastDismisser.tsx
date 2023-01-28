type ToastDismisserProps = {
  timeout?: number;
  dismissAll: () => void;
};
const ToastDismisser = ({ timeout, dismissAll }: ToastDismisserProps) => {
  setTimeout(() => {
    dismissAll();
  }, timeout ?? 25000);
  return null;
};

export default ToastDismisser;
