import React, { ButtonHTMLAttributes } from "react";
import { COLORS } from "../../consts/colors";
import { MakeRequired } from "../../types/helpers/MakeRequired";
import { Variant } from "../../types/Variant";

export interface ButtonProps
  extends MakeRequired<
    React.HTMLAttributes<HTMLButtonElement> &
      ButtonHTMLAttributes<HTMLButtonElement>,
    "type"
  > {
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
  const classNames = [
    "p-2",
    "border",
    "rounded-sm",
    "bg-transparent",
    `border-${COLORS[variant]}`,
    `text-${COLORS[variant]}`,
    `hover:bg-${COLORS[variant]}`,
    "hover:text-white",
  ];
  classes && classNames.push(classes);
  return classNames.join(" ");
}
