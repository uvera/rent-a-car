import { useEffect } from "react";

const useBodyOverflow = () => {
  useEffect(() => {
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  return [
    () => {
      if (!document.body.classList.contains("overflow-hidden")) {
        document.body.classList.add("overflow-hidden");
      }
    },
    () => {
      if (document.body.classList.contains("overflow-hidden")) {
        document.body.classList.remove("overflow-hidden");
      }
    },
  ];
};

export default useBodyOverflow;
