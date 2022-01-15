import React, { ElementType, PropsWithChildren } from "react";
import { GetHTMLElement } from "../types/helpers/GetHTMLElement";
import { Polymorph } from "../types/helpers/Polymorph";
import { Animate, AnimateStylesProps } from "../Animations/Animate";
import { useModal } from "../Modal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { useOverlay } from "../Overlay/useOverlay";
import { useTheme } from "../useTheme";
import { useMenuContext } from "./Menu";

const defaultMenuStyles: AnimateStylesProps["defaultStyles"] = {
  transform: `scaleY(0)`,
  opacity: "0",
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

export type MenuOptionsProp<E extends ElementType> = Polymorph<
  PropsWithChildren<
    AnimateStylesProps & {
      transitionProperties?: string[];
      style?: React.CSSProperties;
    }
  >,
  E
>;
const defaultElement = "ul";
export function MenuOptions<E extends ElementType = typeof defaultElement>(
  props: MenuOptionsProp<E>
) {
  const theme = useTheme();
  const {
    style = {},
    as: Component = defaultElement,
    defaultStyles = {},
    transitionStyles = {},
    transitionProperties = ["opacity", "transform"],
    ...rest
  } = props;
  const componentRef =
    React.useRef<GetHTMLElement<typeof defaultElement>>(null);
  const [styles, setStyles] = React.useState<React.CSSProperties>({});
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
      const { bottom, left, top, width } =
        controlRef.current.getBoundingClientRect();
      const { offsetHeight = 0 } = componentRef.current ?? {};

      if (top + offsetHeight > window.innerHeight) {
        // Menu on top
        styles.top = `${top - offsetHeight}px`;
        styles.transformOrigin = "50% 100%";
      } else {
        // Menu below
        styles.top = `${bottom}px`;
        styles.transformOrigin = "50% 0%";
      }
      styles.left = `${left}px`;
      styles.width = `${width}px`;
    }
    return styles;
  }, []);
  const transition = transitionProperties
    .map((key) => `${key} ${theme.timeout}ms`)
    .join(", ");

  React.useLayoutEffect(() => {
    if (modalVisible) {
      setStyles(getStyles());
    }
  }, [modalVisible]);

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
          ref={componentRef}
          style={{
            ...style,
            ...styles,
          }}
        />
      </Animate>
    </Overlay>
  );
}
