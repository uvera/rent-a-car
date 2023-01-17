type ToastDismisserProps = {
  timeout?: number;
};
const ToastDismisser = ({ timeout }: ToastDismisserProps) => {
  setTimeout(() => {
    const foundElements = document.querySelectorAll("[data-feature-toast]");
    foundElements.forEach((element) => element.remove());
  }, timeout ?? 25000);
  return null;
};

export default ToastDismisser;
