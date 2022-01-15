import React, { ElementType } from "react";
import { noop } from "../utils/noop";
import { SelectProps } from "./Select";
import { OptionShape } from "../Menu/Menu";
import { Polymorph } from "../types/helpers/Polymorph";

export type SelectOptionProps<T, E extends ElementType> = Polymorph<
  Pick<SelectProps<T>, "onOptionChange"> & {
    option: OptionShape<T>;
  },
  E,
  "onClick"
>;
const defaultElement = "li";
export function SelectOption<T, E extends ElementType = typeof defaultElement>(
  props: SelectOptionProps<T, E>
) {
  const {
    option,
    onOptionChange: _onChange,
    as: Component = defaultElement,
    ...rest
  } = props;
  const onOptionChange = React.useCallback(
    _onChange ? () => _onChange(option) : noop,
    []
  );

  return (
    <Component {...rest} onClick={onOptionChange} role="option">
      {option.label}
    </Component>
  );
}
