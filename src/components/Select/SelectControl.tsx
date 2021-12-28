import React from "react";
import { useSelectContext } from "./SelectContext";

export type SelectControlProps = {
  children: React.ReactElement;
};
export function SelectControl(props: SelectControlProps) {
  const { children } = props;
  const { controlRef, toggle } = useSelectContext();

  return React.cloneElement(children, {
    ref: controlRef,
    "aria-haspopup": "listbox",
    onClick: toggle,
    className: `cursor-pointer ${children.props.className}`,
  });
}
