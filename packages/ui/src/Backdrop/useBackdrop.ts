import React from "react";
import { useToggle } from "../hooks/useToggle";

export function useBackdrop(visible: boolean, overlayVisible: boolean) {
  const {
    visible: backdropVisible,
    show: showBackdrop,
    hide: hideBackdrop,
  } = useToggle(visible);

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

  return { backdropVisible };
}
