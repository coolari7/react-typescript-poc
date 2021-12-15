import React from "react";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "../useTheme";
import { TransitionProps } from "react-transition-group/Transition";

interface ScaleContainerProps {
  timeout: TransitionProps["timeout"];
  scale: number;
}
const ScaleContainer = styled.div<ScaleContainerProps>(
  (props) => `
  &.scale-enter {
    transform: scale(${props.scale});
  }

  &.scale-enter-active {
    transform: none;
    transition: transform ${props.timeout}ms linear;
  }

  &.scale-exit {
    transform: none;
  }

  &.scale-exit-active {
    transform: scale(${props.scale});
    transition: transform ${props.timeout}ms linear;
  }
`
);

export type ScaleProps = Partial<TransitionProps<undefined>> & {
  in: boolean;
  scale?: number;
};
export const Scale = (props: ScaleProps) => {
  const theme = useTheme();
  const {
    children,
    timeout = theme.timeout,
    unmountOnExit = true,
    scale = 0.7,
    ...rest
  } = props;

  return (
    <CSSTransition
      {...rest}
      unmountOnExit={unmountOnExit}
      timeout={timeout}
      classNames="scale"
    >
      <ScaleContainer scale={scale} timeout={timeout}>
        {children}
      </ScaleContainer>
    </CSSTransition>
  );
};
