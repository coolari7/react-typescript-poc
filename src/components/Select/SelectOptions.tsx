import React from "react";
import { classnames } from "../../utils/classnames";
import { Animate } from "../Animations/Animate";
import { useModal } from "../Modal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { useOverlay } from "../Overlay/useOverlay";
import { useTheme } from "../useTheme";
import { useSelectContext } from "./SelectContext";

export type SelectOptionsProps = {
  children: React.ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
};
export function SelectOptions(props: SelectOptionsProps) {
  const theme = useTheme();
  const {
    children,
    tag: Component = "ul",
    className = "",
    style = {},
    ...rest
  } = props;
  const { controlRef, toggle, visible: inProp } = useSelectContext();
  const { overlayVisible, hideOverlay } = useOverlay(inProp);
  const { modalVisible } = useModal(inProp, overlayVisible);

  const getStyles = React.useCallback((): React.CSSProperties => {
    let styles: React.CSSProperties = {
      minWidth: "120px",
      position: "absolute",
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

  return (
    <Overlay visible={overlayVisible} onOverlayClick={toggle}>
      <Animate
        in={modalVisible}
        onExited={hideOverlay}
        defaultStyles={{
          transform: `scaleY(0)`,
          opacity: "0",
          transformOrigin: "50% 0",
          transitionTimingFunction: "ease",
          transition: `opacity ${theme.timeout}ms, transform ${theme.timeout}ms`,
        }}
        transitionStyles={{
          entering: {
            transform: "none",
            opacity: "1",
          },
          entered: {
            transform: "none",
            opacity: "1",
          },
        }}
      >
        <Component
          style={{
            ...style,
            ...getStyles(),
          }}
          className={classnames(
            { "shadow-lg bg-white max-h-52 overflow-auto": className === "" },
            className
          )}
          {...rest}
          role="listbox"
        >
          {children}
        </Component>
      </Animate>
    </Overlay>
  );
}
