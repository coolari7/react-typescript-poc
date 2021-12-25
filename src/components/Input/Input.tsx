import React from "react";
import { COLORS } from "../../consts/colors";
import { MakeRequired } from "../../types/helpers/MakeRequired";

export interface InputProps
  extends MakeRequired<
    Exclude<React.HTMLAttributes<HTMLInputElement>, "onChange"> &
      React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  invalid: boolean;
}

export function Input({ value, onChange, invalid, ...props }: InputProps) {
  const classes = getInputClasses(invalid, props.className);
  return (
    <input value={value} onChange={onChange} className={classes} {...props} />
  );
}

function getInputClasses(invalid: boolean, className?: string): string {
  const classes = [
    "p-2",
    "outline-none",
    "border",
    `border-${invalid ? COLORS["danger"] : COLORS["standard"]}`,
    "block",
    "w-full",
    `focus:border-${invalid ? COLORS["danger"] : COLORS["info"]}`,
  ];
  className && classes.push(className);
  return classes.join(" ");
}
