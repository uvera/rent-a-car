import Select from "react-select";
import React from "react";

type OptionLabel = string;
type OptionValue = string;
type MultiSelectProps = {
  choices: Array<[OptionLabel, OptionValue]>;
  name: string;
  selectLabel: string;
  defaultValues: Array<string>;
};

const MultiSelect = ({
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
