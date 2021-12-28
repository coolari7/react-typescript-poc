import React from "react";
import { OptionShape, SelectContainer } from "./SelectContext";
import { SelectControl } from "./SelectControl";
import { SelectOption } from "./SelectOption";
import { SelectOptions } from "./SelectOptions";

export interface SelectProps<T> {
  value: OptionShape<T>;
  onOptionChange?(arg: OptionShape<T>): void;
  options: OptionShape<T>[];
}
export function Select<T>(props: SelectProps<T>) {
  const { options = [], value, onOptionChange } = props;

  const mappedOptions = options.map((option, index) => (
    <SelectOption option={option} onOptionChange={onOptionChange} key={index}>
      {option.label}
    </SelectOption>
  ));

  return (
    <SelectContainer>
      <SelectControl>
        <button
          className="p-2 border border-gray-200 focus:border-blue-500 text-sm text-gray-700 cursor-pointer text-left"
          style={{ minWidth: "120px" }}
        >
          {value.label}
        </button>
      </SelectControl>
      <SelectOptions>{mappedOptions}</SelectOptions>
    </SelectContainer>
  );
}
