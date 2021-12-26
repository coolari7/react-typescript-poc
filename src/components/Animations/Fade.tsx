import React from "react";
import { useTheme } from "../useTheme";
import { Animate, AnimateProps } from "./Animate";

export type FadeProps = AnimateProps;
export const Fade = (props: FadeProps) => {
  const theme = useTheme();
  const {
    timeout = theme.timeout,
    defaultStyles = {
      opacity: "0",
      transition: `opacity ${timeout}ms linear`,
    },
    transitionStyles = {
      entering: {
        opacity: "1",
      },
      entered: {
        opacity: "1",
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
