import React from "react";
import { OptionShape, useSelectContext } from "./SelectContext";

export type SelectControlProps<T> = Pick<OptionShape<T>, "label">;
export function SelectControl<T>(props: SelectControlProps<T>) {
  const { label = "" } = props;
  const { controlRef, toggle } = useSelectContext();

  return (
    <button
      ref={controlRef}
      type="button"
      aria-haspopup="listbox"
      className="p-2 border border-blue-500 text-sm text-gray-700 cursor-pointer text-left"
      onClick={toggle}
      style={{ minWidth: "120px" }}
    >
      {label}
    </button>
  );
}
