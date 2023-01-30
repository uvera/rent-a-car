import React from "react";
import { useState } from "react";
import i18n from "../../util/i18n";
import { Modal } from "flowbite-react";

type ImageModalProps = {
  imgUrl: string;
  downloadUrl: string;
};

const ImageModal = ({ imgUrl, downloadUrl }: ImageModalProps) => {
  const [shown, setShown] = useState(false);

  const showModal = () => setShown(true);
  const hideModal = () => setShown(false);

  return (
    <>
      <button onClick={showModal}>
        <svg
          data-darkreader-inline-stroke=""
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="z-20 w-16 h-16 block text-white bg-gray-300 hover:bg-gray-500 bg-opacity-25 opacity-75 focus:outline-none rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
          ></path>
        </svg>
      </button>
      <Modal show={shown} onClose={hideModal} size={"5xl"} className={"!z-100"}>
        <Modal.Header>
          <button
            type="button"
            className="focus:outline-none text-white bg-accent hover:bg-accent-600 focus:ring-4
                            focus:ring-accent font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
                            dark:focus:ring-accent"
          >
            {i18n.t("forms.buttons.download")}
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="p-6">
            <img src={imgUrl} alt="car" className="w-full h-auto" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ImageModal;
