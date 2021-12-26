import React from "react";
import { useTheme } from "../useTheme";
import { Animate, AnimateProps } from "./Animate";

export type ScaleProps = AnimateProps & {
  scale?: number;
};
export const Scale = (props: ScaleProps) => {
  const theme = useTheme();
  const {
    timeout = theme.timeout,
    scale = 0.5,
    defaultStyles = {
      transform: `scale(${scale})`,
      transition: `transform ${timeout}ms linear`,
    },
    transitionStyles = {
      entering: {
        transform: "none",
      },
      entered: {
        transform: "none",
      },
    },
    ...rest
  } = props;

  return (
    <Animate
      {...rest}
      defaultStyles={defaultStyles}
      transitionStyles={transitionStyles}
    />
  );
};
