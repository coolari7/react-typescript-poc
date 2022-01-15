import React from "react";
import { MakeRequired } from "../types/helpers/MakeRequired";

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
  const classes = ["p-2", "outline-none", "border", "block", "w-full"];
  classes.push(
    invalid
      ? "border-red-500 focus:border-red-500"
      : "border-gray-200 focus:border-blue-500"
  );
  className && classes.push(className);
  return classes.join(" ");
}
