import Select from "react-select";
import React from "react";

type OptionLabel = string;
type OptionValue = string;
type MultiSelectProps = {
  className: string;
  choices: Array<[OptionLabel, OptionValue]>;
  name: string;
  selectLabel: string;
  defaultValues: Array<string>;
};

const selectStyles = `
      resize-none block w-full p-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
      `;

const controlStyles = `
      border-0
`;
const bgGrayStyles = "bg-gray-50";

const menuStyles =
  "-ml-1 bg-white mt-2 border border-gray-200 rounded-lg overflow-hidden";

const clearIndicatorStyles = "cursor-pointer";

const MultiSelect = ({
  className,
  choices,
  name,
  selectLabel,
  defaultValues,
}: MultiSelectProps) => {
  const options = choices.map(([label, value]) => ({ label, value }));

  const defaultValue = defaultValues.map((v) =>
    options.find((opt) => opt.value === v)
  );

  return (
    <>
      <Select
        unstyled
        classNames={{
          singleValue: () => `${bgGrayStyles}`,
          control: () =>
            `${bgGrayStyles} border-none ${controlStyles} focus:shadow-none`,
          clearIndicator: () => clearIndicatorStyles,
          container: (props) =>
            `${selectStyles} ${props.isFocused ? "z-50" : ""}`,
          multiValue: () => "",
          valueContainer: () => `${bgGrayStyles} border-0`,
          input: () => `${bgGrayStyles} caret-accent ml-2`,
          loadingIndicator: () => bgGrayStyles,
          menu: () => menuStyles,
          option: () => "p-2 hover:bg-accent rounded-sm",
          placeholder: () => "text-gray-500 z-10 text-sm ml-3",
        }}
        className={className}
        placeholder={selectLabel}
        name={name}
        isMulti
        defaultValue={defaultValue}
        options={options}
      />
    </>
  );
};
export default MultiSelect;
