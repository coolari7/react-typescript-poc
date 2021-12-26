import React, { RefObject, useContext } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useToggle, useToggleProps } from "../../hooks/useToggle";
import { noop } from "../../utils/noop";

/**
 * React.forwardRef can't work with generic proptypes.
 * see https://stackoverflow.com/a/58473012
 */
export type SelectRef<T extends HTMLElement = HTMLButtonElement> = {
  controlRef: RefObject<T>;
};
export interface OptionShape<T> {
  label: string;
  value: T;
}
export type SelectContextProps = SelectRef &
  Pick<useToggleProps, "visible" | "toggle">;

const defaultContext: SelectContextProps = {
  controlRef: { current: null },
  visible: false,
  toggle: noop,
};

const SelectContext = React.createContext<SelectContextProps>(defaultContext);

type SelectProviderProps = {
  children: React.ReactNode;
};
export const SelectProvider = (props: SelectProviderProps) => {
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

  return (
    <SelectContext.Provider value={value}>{children}</SelectContext.Provider>
  );
};

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw "'useSelectContext' can only be used within SelectContextProvider";
  }
  return context;
}
