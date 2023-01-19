type ToastDismisserProps = {
  timeout?: number;
  msg: string;
  type: string;
};
const ToastDismisser = ({ timeout }: ToastDismisserProps) => {
  setTimeout(() => {
    const foundElements = document.querySelectorAll("[data-feature-toast]");
    foundElements.forEach((element) => element.remove());
  }, timeout ?? 25000);
  return null;
};

export default ToastDismisser;
