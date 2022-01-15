import React from "react";
import { useTheme } from "../useTheme";
import Transition, {
  TransitionProps as _TransitionProps,
  TransitionStatus,
} from "react-transition-group/Transition";
import { triggerReflow } from "../utils/triggerReflow";

type _TransitionEventHandlers =
  | "onEnter"
  | "onEntering"
  | "onEntered"
  | "onExit"
  | "onExiting"
  | "onExited";
type _TransitionRegulars =
  | "in"
  | "mountOnEnter"
  | "unmountOnExit"
  | "timeout"
  | "addEndListener"
  | "children";

export type TransitionEventHandlers = Pick<
  _TransitionProps,
  _TransitionEventHandlers
>;
export type TransitionRegulars = Pick<_TransitionProps, _TransitionRegulars>;

export type AnimateTransitionProps = TransitionEventHandlers &
  TransitionRegulars;
export type AnimateStylesProps = {
  defaultStyles?: Partial<CSSStyleDeclaration>;
  transitionStyles?: Partial<
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

  if (!props.children) throw new Error("'children' is required!");
  if (typeof props.children === "function")
    throw new Error("'children' must be of type JSX.Element!");
  if (React.Children.count(props.children) > 1)
    throw new Error("Multiple root level 'children' aren't allowed!");
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
