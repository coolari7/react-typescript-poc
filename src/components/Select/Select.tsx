import React from "react";
import { Menu } from "../Menu/Menu";
import { MenuControl } from "../Menu/MenuControl";
import { MenuOptions } from "../Menu/MenuOptions";
import { OptionShape } from "../Menu/Menu";
import { SelectOption } from "./SelectOption";

export interface SelectProps<T> {
  value: OptionShape<T>;
  onOptionChange?(arg: OptionShape<T>): void;
  options: OptionShape<T>[];
}
export function Select<T>(props: SelectProps<T>) {
  const { options = [], value, onOptionChange } = props;

  const mappedOptions = options.map((option, index) => (
    <SelectOption
      option={option}
      onOptionChange={onOptionChange}
      key={index}
      className="p-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
      role="option"
      aria-selected={value.label === option.label}
    />
  ));

  return (
    <Menu>
      <MenuControl
        as="button"
        className="p-2 border border-gray-200 focus:border-blue-500 text-sm text-gray-700 cursor-pointer text-left"
        style={{ minWidth: "120px" }}
      >
        {value.label}
      </MenuControl>
      <MenuOptions
        as="ul"
        className="shadow-lg bg-white max-h-52 overflow-auto"
        role="listbox"
      >
        {mappedOptions}
      </MenuOptions>
    </Menu>
  );
}
