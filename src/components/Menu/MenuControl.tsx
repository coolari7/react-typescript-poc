import React, { PropsWithChildren } from "react";
import { useMenuContext } from "./Menu";

export type MenuControlProps = {
  children: React.ReactElement;
};
/**
 * onClick() of 'children' will be used to trigger open/close
 */
export function MenuControl(props: PropsWithChildren<{}>) {
  const { children } = props;
  const { controlRef, toggle } = useMenuContext();

  return React.cloneElement(children as React.ReactElement, {
    ref: controlRef,
    "aria-haspopup": "listbox",
    onClick: toggle,
  });
}
