import React from "react";
import { useTheme } from "../useTheme";
import { Animate, AnimateTransitionProps } from "./Animate";

export type ScaleProps = AnimateTransitionProps & {
  scale?: number;
};
export const Scale = (props: ScaleProps) => {
  const theme = useTheme();
  const { timeout = theme.timeout, scale = 0.5, ...rest } = props;

  return (
    <Animate
      {...rest}
      timeout={timeout}
      defaultStyles={{
        transform: `scale(${scale})`,
        transition: `transform ${timeout}ms linear`,
      }}
      transitionStyles={{
        entering: {
          transform: "none",
        },
        entered: {
          transform: "none",
        },
      }}
    />
  );
};
