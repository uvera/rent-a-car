import React, { useEffect, useState } from "react";
import ToastDismisser from "../configurations/toastDismisser";
import { ToastCloseButton } from "../toastCloseButton";
import useMitt from "../../../util/useMitt";
import { Handler } from "mitt";
import uniqBy from "../../../util/uniqBy";

type FlashRecord = { msg: string; type: "notice" | "alert" | "error" };
type FlashMessagesProps = {
  flashes: Array<FlashRecord>;
  timeout: number;
};
export type FlashMitEvent = { type: FlashRecord["type"]; msg: string };

const FlashMessages = ({ flashes: values, timeout }: FlashMessagesProps) => {
  const [flashes, setFlashes] = useState(values);
  const closeFlashByIndex = (idx: number) => {
    setFlashes((previous) => {
      const newFlashes = structuredClone(previous);
      newFlashes.splice(idx, 1);
      return newFlashes;
    });
  };

  const mitt = useMitt<{ flash: FlashMitEvent }>();

  const handleNewFlash: Handler<{ type: FlashRecord["type"]; msg: string }> = (
    flash
  ) => {
    setFlashes((previous) => {
      return uniqBy([...structuredClone(previous), flash], (f) => f.type);
    });
  };

  useEffect(() => {
    mitt.on("flash", handleNewFlash);
    return () => mitt.off("flash", handleNewFlash);
  });

  return (
    <>
      {flashes.map(({ msg, type }, idx) => (
        <Flash
          key={idx}
          dismissTimeout={timeout}
          type={type}
          msg={msg}
          onClose={() => closeFlashByIndex(idx)}
        />
      ))}
    </>
  );
};

type FlashProps = {
  dismissTimeout: number;
  msg: string;
  onClose: () => void;
  type: FlashMessagesProps["flashes"][0]["type"];
};

const Flash = ({ dismissTimeout, msg, onClose, type }: FlashProps) => {
  const Display = () => {
    switch (type) {
      case "notice":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
        );
      case "error":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
        );
      case "alert":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
        );
    }
  };

  return (
    <>
      <div
        data-feature-toast={true}
        id={`toast-${type}`}
        className="fixed top-5 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <ToastDismisser close={onClose} timeout={dismissTimeout} />
        <Display />
        <div className="ml-3 text-sm font-normal">{msg}</div>
        <span className="inline-flex ml-auto">
          <ToastCloseButton onClose={onClose} />
        </span>
      </div>
    </>
  );
};

export default FlashMessages;
