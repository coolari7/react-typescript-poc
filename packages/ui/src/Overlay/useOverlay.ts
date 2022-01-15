import React from "react";
import { useToggle } from "../hooks/useToggle";

export function useOverlay(visible: boolean) {
  const {
    visible: overlayVisible,
    show: showOverlay,
    hide: hideOverlay,
  } = useToggle(visible);

  React.useLayoutEffect(() => {
    if (visible && !overlayVisible) {
      showOverlay();
    }
  }, [visible]);

  return { overlayVisible, hideOverlay };
}
