import React from "react";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "../useTheme";
import { ExitHandler } from "react-transition-group/Transition";

interface FadeContainerProps {
  timeout: number;
}
const FadeContainer = styled.div<FadeContainerProps>(
  (props) => `
  &.fade-enter {
    opacity: 0;
  }

  &.fade-enter-active {
    opacity: 1;
    transition: opacity ${props.timeout}ms linear;
  }

  &.fade-exit {
    opacity: 1;
  }

  &.fade-exit-active {
    opacity: 0;
    transition: opacity ${props.timeout}ms linear;
  }
`
);

export interface FadeProps {
  visible: boolean;
  children: React.ReactNode;
  onExited?: ExitHandler<HTMLElement | undefined> | undefined;
}
export const Fade = ({ visible, children, onExited }: FadeProps) => {
  const theme = useTheme();

  return (
    <CSSTransition
      in={visible}
      unmountOnExit
      timeout={theme.timeout}
      classNames="fade"
      onExited={onExited}
    >
      <FadeContainer timeout={theme.timeout}>{children}</FadeContainer>
    </CSSTransition>
  );
};

export const Base = styled(CSSTransition)((props) => {
  const { timeout } = props;

  if (typeof timeout !== "number") {
    throw "prop 'timeout' of type 'number' is required in component <Base />";
  }

  return `
    &.fade-enter {
      opacity: 0;
    }

    &.fade-enter-active {
      opacity: 1;
      transition: opacity ${timeout}ms linear;
    }

    &.fade-exit {
      opacity: 1;
    }

    &.fade-exit-active {
      opacity: 0;
      transition: opacity ${timeout}ms linear;
    }
  `;
});
Base.defaultProps = {
  classNames: "fade",
  unmountOnExit: true,
  mountOnEnter: false,
};
