import React from "react";
import styled from "@emotion/styled";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "../useTheme";

interface FadeContainerProps {
  timeout: number;
}
const FadeContainer = styled.div<FadeContainerProps>(
  (props) => `
  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity ${props.timeout}ms linear;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: opacity ${props.timeout}ms linear;
  }
`
);

export interface FadeProps {
  visible: boolean;
  children: React.ReactNode;
}
export const Fade = ({ visible, children }: FadeProps) => {
  const theme = useTheme();

  return (
    <FadeContainer timeout={theme.timeout}>
      <CSSTransition
        in={visible}
        unmountOnExit
        timeout={theme.timeout}
        classNames="fade"
      >
        {children}
      </CSSTransition>
    </FadeContainer>
  );
};
