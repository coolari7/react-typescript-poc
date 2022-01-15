import React, { ButtonHTMLAttributes } from "react";
import { MakeRequired } from "../types/helpers/MakeRequired";
import { Variant } from "../types/Variant";

export interface ButtonProps
  extends MakeRequired<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children: string;
  variant?: Variant;
}

export function Button({
  children,
  type,
  className,
  variant = "info",
  ...props
}: ButtonProps) {
  const classes = getButtonClasses(variant, className);
  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}

function getButtonClasses(variant: Variant, classes?: string): string {
  const classNames = [];

  classes && classNames.push(classes);

  classNames.push(
    "p-2",
    "border",
    "text-sm",
    "rounded-sm",
    "bg-transparent",
    "hover:text-white"
  );

  switch (variant) {
    case "info":
      classNames.push("border-blue-500", "text-blue-500", "hover:bg-blue-500");
      break;
    case "success":
      classNames.push("border-blue-500", "text-blue-500", "hover:bg-blue-500");
      break;
    case "danger":
      classNames.push("border-red-500", "text-red-500", "hover:bg-red-500");
      break;
    case "warn":
      classNames.push(
        "border-yellow-500",
        "text-yellow-500",
        "hover:bg-yellow-500"
      );
      break;
    case "standard":
      classNames.push("border-gray-200", "text-gray-200", "hover:bg-gray-200");
      break;
    default:
      break;
  }

  return classNames.join(" ");
}
