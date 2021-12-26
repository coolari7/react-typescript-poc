import React from "react";
import { OptionShape, SelectProvider } from "./SelectContext";
import { SelectControl } from "./SelectControl";
import { SelectOptions } from "./SelectOptions";

export interface SelectProps<T> {
  value: OptionShape<T>;
  onChange(arg: OptionShape<T>): void;
  options: OptionShape<T>[];
}
export function Select<T>(props: SelectProps<T>) {
  const { options = [], value, onChange } = props;

  return (
    <SelectProvider>
      <SelectControl label={value.label} />
      <SelectOptions options={options} onChange={onChange} />
    </SelectProvider>
  );
}
