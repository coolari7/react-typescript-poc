import React from "react";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useToggle } from "../../hooks/useToggle";
import { SelectControl } from "./SelectControl";
import { SelectOptions } from "./SelectOptions";

export interface OptionShape<T> {
  label: string;
  value: T;
}

/**
 * React.forwardRef can't work with generic proptypes.
 * see https://stackoverflow.com/a/58473012
 */
export type SelectRef = {
  controlRef: React.RefObject<HTMLButtonElement>;
};

export interface SelectProps<T> {
  value: OptionShape<T>;
  onChange(arg: OptionShape<T>): void;
  options: OptionShape<T>[];
}
export function Select<T>(props: SelectProps<T>) {
  const { visible, toggle } = useToggle();
  const { lock, unlock } = useScrollLock();
  const { options = [], value, onChange } = props;
  const controlRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    (visible ? lock : unlock)();
  }, [visible]);

  return (
    <>
      <SelectControl
        label={value.label}
        controlRef={controlRef}
        onControlClick={toggle}
      />
      <SelectOptions
        in={visible}
        options={options}
        onChange={onChange}
        controlRef={controlRef}
        onOptionsClick={toggle}
      />
    </>
  );
}
