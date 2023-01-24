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
      resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
      `;

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
          singleValue: () => `${bgGrayStyles} z-20`,
          control: () => `${bgGrayStyles} border-0`,
          dropdownIndicator: () => bgGrayStyles,
          container: () => selectStyles,
          valueContainer: () => `${bgGrayStyles} border-0`,
          input: () => `${bgGrayStyles} border-none`,
          menuList: () => bgGrayStyles,
        }}
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
