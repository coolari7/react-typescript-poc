import React from "react";
import { classnames } from "../../utils/classnames";
import { noop } from "../../utils/noop";
import { SelectProps } from "./Select";
import { OptionShape } from "./SelectContext";

export type SelectOptionProps<T> = Pick<SelectProps<T>, "onOptionChange"> & {
  option: OptionShape<T>;
  children: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  [key: string]: any;
};

export function SelectOption<T>(props: SelectOptionProps<T>) {
  const {
    option,
    onOptionChange: _onChange,
    children,
    tag: Component = "li",
    className = "",
    ...rest
  } = props;
  const onOptionChange = React.useCallback(
    _onChange ? () => _onChange(option) : noop,
    []
  );

  return (
    <Component
      className={classnames({
        "p-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer":
          className === "",
      })}
      {...rest}
      onClick={onOptionChange}
      role="option"
    >
      {children}
    </Component>
  );
}
