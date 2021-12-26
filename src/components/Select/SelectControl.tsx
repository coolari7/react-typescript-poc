import React from "react";
import { OptionShape, SelectRef } from "./Select";

export type SelectControlProps<T> = Pick<OptionShape<T>, "label"> &
  SelectRef & {
    onControlClick(e: React.MouseEvent<HTMLButtonElement>): void;
  };
export function SelectControl<T>(props: SelectControlProps<T>) {
  const { label = "", onControlClick, controlRef } = props;

  return (
    <button
      ref={controlRef}
      type="button"
      aria-haspopup="listbox"
      className="p-2 border border-blue-500 text-sm text-gray-700 cursor-pointer text-left"
      onClick={onControlClick}
      style={{ minWidth: "120px" }}
    >
      {label}
    </button>
  );
}
