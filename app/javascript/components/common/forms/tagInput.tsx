import React, { KeyboardEventHandler, useState } from "react";
import "flowbite";

type TagInputProps = {
  entityName: string;
  fieldName: string;
  value: Array<string>;
};
const TagInput = ({ value, fieldName, entityName }: TagInputProps) => {
  const [tags, setTags] = useState(value);
  const [currentValue, setCurrentValue] = useState("");
  const removeTag = (tag: string) => {
    setTags((prev) => {
      const newTags = [...prev];
      const index = newTags.indexOf(tag);
      if (index > -1) {
        newTags.splice(index, 1);
      }
      return newTags;
    });
  };

  const pushCurrentValue = () => {
    setTags((prev) => {
      const newTags = [...prev];
      newTags.push(currentValue);
      return newTags;
    });
    setCurrentValue("");
  };

  const inputKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      pushCurrentValue();
    }
  };

  return (
    <>
      {tags.map((tag, idx) => (
        <input
          key={idx}
          type="hidden"
          name={`${entityName}[${fieldName}][]`}
          value={tag}
        />
      ))}
      <div className="flex flex-col gap-y-2 items-center mt-1 text-sm sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:mb-2">
          <label htmlFor="input1">
            <input
              value={currentValue}
              onKeyDown={(e) => inputKeyDown(e)}
              onChange={(e) => setCurrentValue(e.target.value)}
              id="input1"
              className="mt-1 py-3 px-5 w-full border-2 border-yellow-300 rounded-2xl outline-none placeholder:text-gray-400 invalid:text-yellow-700 invalid:focus:ring-yellow-700 invalid:focus:border-yellow-700 peer dark:bg-gray-500 dark:text-gray-200 dark:placeholder:text-gray-300 dark:invalid:text-yellow-300 dark:border-gray-400"
              type="text"
            />
          </label>
        </div>
        <div
          onClick={() => pushCurrentValue()}
          className="w-full text-center py-3 px-8 text-sm font-medium bg-yellow-500 text-gray-100 rounded-2xl cursor-pointer sm:w-min hover:bg-yellow-700 hover:text-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 mb-4 sm:mb-0"
        >
          <span>Add</span>
        </div>
      </div>
      <div className="px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg bg-yellow-200 dark:bg-gray-400">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-yellow-500 text-gray-200 hover:bg-yellow-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            {tag}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3 hover:text-gray-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                onClick={() => removeTag(tag)}
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        ))}
      </div>
    </>
  );
};

export default TagInput;
