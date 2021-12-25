import React, { SelectHTMLAttributes } from "react";
import { COLORS } from "../../consts/colors";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useToggle } from "../../hooks/useToggle";
import { MakeRequired } from "../../types/helpers/MakeRequired";
import { Button as Button2 } from "../Buttons/Button";
import { Overlay } from "../Overlay/Overlay";

export interface MenuProps {
  children?: React.ReactNode;
}
export function Menu(props: MenuProps) {
  return <div>{props.children}</div>;
}

// MENU BUTTON
interface MenuButtonProps {
  children: string;
}
function Button({ children, ...props }: MenuButtonProps) {
  return (
    <button
      aria-haspopup="menu"
      className={`block w-full p-2 border border-${COLORS["standard"]}`}
      {...props}
    >
      {children}
    </button>
  );
}

// MENU ITEMS
interface MenuItemsProps {
  values: string[];
}
function Items({ values, ...props }: MenuItemsProps) {
  const getItems = React.useCallback(
    () =>
      values.map((value) => (
        <li role="menuitem" className="p-2 border-b">
          {value}
        </li>
      )),
    [values]
  );

  return (
    <ul
      role="menu"
      className={`border border-t-0 border-b-0 border-${COLORS["standard"]}`}
      {...props}
    >
      {getItems()}
    </ul>
  );
}

Menu.Button = Button;
Menu.Items = Items;

// NEW
export interface OptionShape {
  label: string;
  value: Exclude<
    React.OptionHTMLAttributes<HTMLOptionElement>["value"],
    undefined
  >;
}
export interface OptionProps {
  options: OptionShape[];
}
export type SelectProps = OptionProps &
  MakeRequired<
    React.SelectHTMLAttributes<HTMLSelectElement> &
      SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange"
  >;
export function Select(props: SelectProps) {
  // TODO: className
  const { value, onChange, options, ...rest } = props;

  return (
    <select {...rest} value={value} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// NEW 2
export interface OptionShape2<T> {
  label: string;
  value: T;
}
export interface SelectProps2<T> {
  value: OptionShape2<T>;
  onChange(arg: OptionShape2<T>): void;
  options: OptionShape2<T>[];
}
export function Select2<T>(props: SelectProps2<T>) {
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

/**
 * React.forwardRef can't work with generic proptypes.
 * see https://stackoverflow.com/a/58473012
 */
type SelectRef = {
  controlRef: React.RefObject<HTMLButtonElement>;
};
type SelectControlProps<T> = Pick<OptionShape2<T>, "label"> &
  SelectRef & {
    onControlClick(e: React.MouseEvent<HTMLButtonElement>): void;
  };
function SelectControl<T>(props: SelectControlProps<T>) {
  const { label = "", onControlClick, controlRef } = props;

  return (
    <button
      ref={controlRef}
      type="button"
      aria-haspopup="listbox"
      className="p-2 border border-blue-500 text-sm text-gray-700 cursor-pointer w-full text-left"
      onClick={onControlClick}
    >
      {label}
    </button>
  );
}

type SelectOptionsProps<T> = Pick<SelectProps2<T>, "options" | "onChange"> &
  SelectRef & {
    in: boolean;
    onOptionsClick(): void;
  };
function SelectOptions<T>(props: SelectOptionsProps<T>) {
  const {
    options = [],
    in: inProp = false,
    onChange: onOptionChange,
    onOptionsClick,
    controlRef,
  } = props;

  const getStyles = React.useCallback((): React.CSSProperties => {
    if (controlRef.current) {
      const {
        bottom,
        left,
        width,
      } = controlRef.current.getBoundingClientRect();
      return {
        top: `${bottom}px`,
        left: `${left}px`,
        width: `${width}px`,
      };
    }
    return {};
  }, [controlRef.current]);

  const mappedOptions = options.map((option) => (
    <SelectOption
      option={option}
      onChange={onOptionChange}
      key={option.label}
    />
  ));

  return (
    <Overlay visible={inProp} onOverlayClick={onOptionsClick}>
      <ul
        style={getStyles()}
        role="listbox"
        className="shadow-lg absolute w-full bg-white"
      >
        {mappedOptions}
      </ul>
    </Overlay>
  );
}

type SelectOptionProps<T> = Pick<SelectProps2<T>, "onChange"> & {
  option: OptionShape2<T>;
};
function SelectOption<T>(props: SelectOptionProps<T>) {
  const { option, onChange } = props;
  const onOptionChange = React.useCallback(() => onChange(option), []);

  return (
    <li
      className="p-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
      onClick={onOptionChange}
      role="option"
    >
      {option.label}
    </li>
  );
}
