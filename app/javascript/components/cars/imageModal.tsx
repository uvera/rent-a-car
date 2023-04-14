import React from "react";

import { Gallery, Item } from "react-photoswipe-gallery";

type ImageModalProps = {
  images: Array<{ url: string; metadata: { width: number; height: number } }>;
};

const ImageModal = ({ images }: ImageModalProps) => {
  return (
    <Gallery withDownloadButton>
      {images.map(({ url, metadata: { width, height } }, index) => (
        <Item
          id={`image-${index}`}
          key={index}
          original={url}
          width={width}
          height={height}
        >
          {({ open, ref }) => (
            <button
              ref={ref as React.MutableRefObject<HTMLButtonElement>}
              onClick={open}
            >
              <svg
                data-darkreader-inline-stroke=""
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="z-30 w-16 h-16 block text-white bg-gray-300 hover:bg-gray-500 bg-opacity-25 opacity-75 focus:outline-none rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                ></path>
              </svg>
            </button>
          )}
        </Item>
      ))}
    </Gallery>
  );
};

export default ImageModal;
