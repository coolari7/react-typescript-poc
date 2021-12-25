import React from "react";
import { useToggle } from "../../hooks/useToggle";

interface Props {
  visible: boolean;
}
export function useBackdrop(visible: boolean) {
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
    if (visible && !backdropVisible) {
      showBackdrop();
    }
  }, [overlayVisible]);

  React.useLayoutEffect(() => {
    if (!visible && backdropVisible) {
      hideBackdrop();
    }
  }, [visible]);

  return { overlayVisible, backdropVisible, hideOverlay };
}
