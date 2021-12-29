import React from "react";
import { noop } from "../../utils/noop";
import { SelectProps } from "./Select";
import { OptionShape } from "../Menu/Menu";

export type SelectOptionProps<T> = Pick<SelectProps<T>, "onOptionChange"> & {
  option: OptionShape<T>;
};

export function SelectOption<T>(props: SelectOptionProps<T>) {
  const { option, onOptionChange: _onChange } = props;
  const onOptionChange = React.useCallback(
    _onChange ? () => _onChange(option) : noop,
    []
  );

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
