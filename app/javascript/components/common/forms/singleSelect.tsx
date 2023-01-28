import Select from "react-select";
import React, { useState } from "react";

type OptionLabel = string;
type OptionValue = string;
type SingleSelectProps = {
  className: string;
  choices: Array<[OptionLabel, OptionValue]>;
  name: string;
  selectLabel: string;
  defaultValue: string;
};

const selectStyles = `
      resize-none block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
      `;

const controlStyles = `
      border-0
`;

const DropdownIndicatorArrow = () => (
  <svg
    className="w-4 h-4 ml-1/2 mr-0.5 stroke-gray-500"
    aria-hidden="true"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    ></path>
  </svg>
);

const SingleSelect = ({
  className,
  choices,
  name,
  selectLabel,
  defaultValue,
}: SingleSelectProps) => {
  const options = choices.map(([label, value]) => ({ label, value }));

  const selectDefaultValue =
    options.find((opt) => opt.value === defaultValue) ?? options[0];

  const [value, setValue] = useState(selectDefaultValue);

  const bgGrayStyles = "bg-gray-50";
  return (
    <>
      <input name={name} type="hidden" value={value?.value} />
      <Select
        classNames={{
          singleValue: () => `${bgGrayStyles} z-10`,
          control: () => `${bgGrayStyles} border-none ${controlStyles}`,
          container: () => selectStyles,
          valueContainer: () => `${bgGrayStyles} border-0`,
          input: () => `${bgGrayStyles} border-none`,
          loadingIndicator: () => bgGrayStyles,
          menu: () => "-ml-2 bg-white mt-2 border border-gray-200 rounded-lg",
          option: () => "p-2 hover:bg-accent rounded-sm",
        }}
        unstyled
        components={{ DropdownIndicator: DropdownIndicatorArrow }}
        className={className}
        placeholder={selectLabel}
        onChange={(e) => setValue(e)}
        value={value}
        name={name}
        defaultValue={selectDefaultValue}
        options={options}
      />
    </>
  );
};
export default SingleSelect;
