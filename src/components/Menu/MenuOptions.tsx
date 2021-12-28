import React, { PropsWithChildren } from "react";
import { classnames } from "../../utils/classnames";
import { Animate, AnimateStylesProps } from "../Animations/Animate";
import { useModal } from "../Modal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { useOverlay } from "../Overlay/useOverlay";
import { useTheme } from "../useTheme";
import { useMenuContext } from "./Menu";

const defaultMenuStyles: AnimateStylesProps["defaultStyles"] = {
  transform: `scaleY(0)`,
  opacity: "0",
  transformOrigin: "50% 0",
  transitionTimingFunction: "ease",
};
const defaultMenuTransitionStyles: AnimateStylesProps["transitionStyles"] = {
  entering: {
    transform: "none",
    opacity: "1",
  },
  entered: {
    transform: "none",
    opacity: "1",
  },
};

export type MenuOptionsProp = PropsWithChildren<
  AnimateStylesProps & {
    as?: keyof JSX.IntrinsicElements;
    transitionProperties?: string[];
    style?: React.CSSProperties;
    [key: string]: any;
  }
>;
export function MenuOptions(props: MenuOptionsProp) {
  const theme = useTheme();
  const {
    children,
    as: Component = "ul",
    style = {},
    defaultStyles = defaultMenuStyles,
    transitionStyles = defaultMenuTransitionStyles,
    transitionProperties = ["opacity", "transform"],
    ...rest
  } = props;
  const { controlRef, toggle, visible: inProp } = useMenuContext();
  const { overlayVisible, hideOverlay } = useOverlay(inProp);
  const { modalVisible } = useModal(inProp, overlayVisible);

  const getStyles = React.useCallback((): React.CSSProperties => {
    let styles: React.CSSProperties = {
      minWidth: style.minWidth ?? "120px",
      position: "absolute",
      overflow: "auto",
    };
    if (controlRef.current) {
      const {
        bottom,
        left,
        width,
      } = controlRef.current.getBoundingClientRect();
      styles = {
        top: `${bottom}px`,
        left: `${left}px`,
        width: `${width}px`,
        ...styles,
      };
    }
    return styles;
  }, [controlRef.current]);
  const transition = transitionProperties
    .map((key) => `${key} ${theme.timeout}ms`)
    .join(", ");

  return (
    <Overlay visible={overlayVisible} onOverlayClick={toggle}>
      <Animate
        in={modalVisible}
        onExited={hideOverlay}
        defaultStyles={{
          ...defaultMenuStyles,
          ...defaultStyles,
          transition,
        }}
        transitionStyles={{
          ...defaultMenuTransitionStyles,
          ...transitionStyles,
        }}
      >
        <Component
          {...rest}
          style={{
            ...style,
            ...getStyles(),
          }}
        >
          {children}
        </Component>
      </Animate>
    </Overlay>
  );
}
