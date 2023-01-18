import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useCsrf } from "../../../util/useCsrf";

type ImagesInputProps = {
  previousImages: Array<{ url: string; deletionUrl: string }>;
  objectName: string;
  fieldName: string;
};

type UploadedFileImage = {
  url: string;
  type: "uploaded";
};

type ExistingFileImage = {
  url: string;
  deletionUrl: string;
  type: "existing";
};

const ImagesInput = ({
  previousImages,
  objectName,
  fieldName,
}: ImagesInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>();
  const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState<Array<string>>([]);
  const { token: csrfToken, param: csrfParam } = useCsrf();
  const [existingImages, setExistingImages] = useState<
    Array<ExistingFileImage>
  >(() => previousImages.map((image) => ({ ...image, type: "existing" })));

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const fileChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUploadedFiles(Array.from(event.target.files));

  const removeUploadedFileByIdx = (idx: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(idx, 1);
      return newFiles;
    });
  };

  const removeImageByUrl = (url: string, idx: number) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
    }).then(() => {
      setExistingImages((prev) => {
        const newFiles = [...prev];
        newFiles.splice(idx, 1);
        return newFiles;
      });
    });
  };

  useEffect(() => {
    const urls = uploadedFiles.map((file) => URL.createObjectURL(file));
    setUploadedFileUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [uploadedFiles]);

  return (
    <>
      <div className="px-2 pt-2 pb-11 mb-3 flex flex-col rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-700">
        <div>
          <input
            className="hidden"
            accept="image/*"
            multiple={true}
            type="file"
            ref={fileInputRef}
            onChange={fileChange}
          />
          <button
            onClick={() => openFilePicker()}
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </button>
        </div>
        <div className="px-2 pt-2 pb-11 mb-3 flex flex-wrap gap-2">
          {existingImages.map((item, idx) => (
            <ImageDisplay
              key={item.url}
              url={item.url}
              remove={() => removeImageByUrl(item.deletionUrl, idx)}
            />
          ))}
          {uploadedFileUrls.map((url, idx) => (
            <ImageDisplay
              key={url}
              url={url}
              remove={() => removeUploadedFileByIdx(idx)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const ImageDisplay = ({ url, remove }: { url: string; remove: () => void }) => {
  return (
    <div key={url} className="w-32 h-32 relative">
      <img
        className="object-cover w-full h-full rounded-lg"
        alt="image"
        key={url}
        src={url}
      />
      <button
        onClick={() => remove()}
        type="button"
        className="absolute top-1 left-1 px-0.5 py-0.5 text-sm bg-red-100 hover:bg-red-200 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};
export { ImagesInput };
