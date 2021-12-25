import React from "react";
import { useTheme } from "../useTheme";
import { Animate, AnimateTransitionProps } from "./Animate";

export type FadeProps = AnimateTransitionProps;
export const Fade = (props: FadeProps) => {
  const theme = useTheme();
  const { timeout = theme.timeout, ...rest } = props;

  return (
    <Animate
      {...rest}
      defaultStyles={{
        opacity: "0",
        transition: `opacity ${timeout}ms linear`,
      }}
      transitionStyles={{
        entering: {
          opacity: "1",
        },
        entered: {
          opacity: "1",
        },
      }}
    />
  );
};
