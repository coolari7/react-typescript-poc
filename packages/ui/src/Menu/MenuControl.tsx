import React, { PropsWithChildren, ElementType } from "react";
import { Polymorph } from "../types/helpers/Polymorph";
import { useMenuContext } from "./Menu";

export function MenuControl<E extends ElementType>(
  props: Polymorph<PropsWithChildren<{}>, E, "onClick" | "ref">
) {
  const { as: Component = "button", ...rest } = props;
  const { controlRef, toggle } = useMenuContext();

  return (
    <Component
      aria-haspopup="listbox"
      {...rest}
      onClick={toggle}
      ref={controlRef}
    />
  );
}
