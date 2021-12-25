import React from "react";
import { useTheme } from "../useTheme";
import Transition, {
  TransitionProps,
  TransitionStatus,
} from "react-transition-group/Transition";
import { triggerReflow } from "../triggerReflow";

export type AnimateTransitionProps = Partial<TransitionProps>;
export type AnimateStylesProps = {
  defaultStyles: Partial<CSSStyleDeclaration>;
  transitionStyles: Partial<
    Record<TransitionStatus, Partial<CSSStyleDeclaration>>
  >;
};
export type AnimateProps = AnimateTransitionProps & AnimateStylesProps;
export const Animate = (props: AnimateProps) => {
  const theme = useTheme();
  const {
    timeout = theme.timeout,
    in: inProp = false,
    unmountOnExit = true,
    defaultStyles = {},
    transitionStyles = {},
    onEnter,
    ...rest
  } = props;

  if (!props.children) throw "'children' is required!";
  if (typeof props.children === "function")
    throw "'children' must be of type JSX.Element!";
  if (React.Children.count(props.children) > 1)
    throw "Multiple root level 'children' aren't allowed!";
  const children = props.children as React.ReactElement;

  const handleEnter = React.useCallback(
    (node: HTMLElement, isAppearing: boolean) => {
      triggerReflow(node);
      onEnter?.(node, isAppearing);
    },
    [props]
  );

  return (
    <Transition
      {...rest}
      in={inProp}
      onEnter={handleEnter}
      timeout={timeout}
      unmountOnExit={unmountOnExit}
    >
      {(state: TransitionStatus, childProps: Record<string, unknown>) =>
        React.cloneElement(children, {
          ...childProps,
          style: {
            ...defaultStyles,
            ...transitionStyles[state],
            ...(children.props?.style ?? {}),
          },
        })
      }
    </Transition>
  );
};
