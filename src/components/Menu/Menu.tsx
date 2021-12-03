import React from "react";
import { COLORS } from "../../consts/colors";

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
