import React from "react";
import { OptionShape, SelectProps } from "./Select";

export type SelectOptionProps<T> = Pick<SelectProps<T>, "onChange"> & {
  option: OptionShape<T>;
};
export function SelectOption<T>(props: SelectOptionProps<T>) {
  const { option, onChange } = props;
  const onOptionChange = React.useCallback(() => onChange(option), []);

  return (
    <li
      className="p-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
      onClick={onOptionChange}
      role="option"
    >
      {option.label}
    </li>
  );
}
