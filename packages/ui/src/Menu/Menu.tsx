import React, { PropsWithChildren, RefObject, useContext } from "react";
import { useScrollLock } from "../hooks/useScrollLock";
import { useToggle, useToggleProps } from "../hooks/useToggle";
import { noop } from "../utils/noop";

/**
 * React.forwardRef can't work with generic proptypes.
 * see https://stackoverflow.com/a/58473012
 */
export type MenuRef<T extends HTMLElement = HTMLButtonElement> = {
  controlRef: RefObject<T>;
};
export interface OptionShape<T> {
  label: string;
  value: T;
}

// Context
export type MenuContextProps = MenuRef &
  Pick<useToggleProps, "visible" | "toggle">;

const defaultContext: MenuContextProps = {
  controlRef: { current: null },
  visible: false,
  toggle: noop,
};
const MenuContext = React.createContext<MenuContextProps>(defaultContext);

export const Menu = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  const { visible, toggle } = useToggle();
  const { lock, unlock } = useScrollLock();
  const controlRef = React.useRef(null);
  const value = React.useMemo(
    () => ({
      controlRef,
      visible,
      toggle,
    }),
    [visible]
  );

  React.useEffect(() => {
    (visible ? lock : unlock)();
  }, [visible]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error(
      "'useMenuContext' can only be used within MenuContextProvider"
    );
  }
  return context;
}
