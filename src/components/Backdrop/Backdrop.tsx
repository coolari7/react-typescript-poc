import React from "react";
import { useToggle } from "../../hooks/useToggle";
import { Fade, FadeProps } from "../Animations/Fade";
import { Overlay } from "../Overlay/Overlay";

export interface BackdropProps {
  visible: boolean;
  onBackdropClick(): void;
  children: React.ReactNode;
}
export function Backdrop(props: BackdropProps) {
  const { visible, onBackdropClick, children } = props;

  const {
    visible: overlayVisible,
    show: showOverlay,
    hide: hideOverlay,
  } = useToggle(visible);
  const {
    visible: backdropVisible,
    show: showBackdrop,
    hide: hideBackdrop,
  } = useToggle(visible);

  React.useLayoutEffect(() => {
    if (visible && !overlayVisible) {
      showOverlay();
    }
  }, [visible]);

  React.useLayoutEffect(() => {
    if (visible && overlayVisible && !backdropVisible) {
      showBackdrop();
    }
    if (!visible) {
      hideBackdrop();
    }
  }, [visible, overlayVisible]);

  return (
    <Overlay visible={overlayVisible}>
      <Fade visible={backdropVisible} onExited={hideOverlay}>
        <div
          onClick={onBackdropClick}
          className="absolute inset-0 bg-gray-500 bg-opacity-50"
        >
          {children}
        </div>
      </Fade>
    </Overlay>
  );
}

interface NewBackdropProps extends Omit<FadeProps, "children"> {
  onBackdropClick(): void;
}
export function NewBackdrop(props: NewBackdropProps) {
  const { visible, onExited, onBackdropClick } = props;
  return (
    <Fade visible={visible} onExited={onExited}>
      <div
        onClick={onBackdropClick}
        className="absolute inset-0 bg-gray-500 bg-opacity-50"
      />
    </Fade>
  );
}
