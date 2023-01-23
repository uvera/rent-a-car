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
  fullHeight?: boolean;
};

const MultiSelect = ({
  className,
  choices,
  name,
  selectLabel,
  defaultValues,
  fullHeight,
}: MultiSelectProps) => {
  const options = choices.map(([label, value]) => ({ label, value }));

  const defaultValue = defaultValues.map((v) =>
    options.find((opt) => opt.value === v)
  );

  return (
    <>
      <Select
        classNames={{
          control: () => (fullHeight ? "h-full" : ""),
          container: () => (fullHeight ? "h-full" : ""),
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
