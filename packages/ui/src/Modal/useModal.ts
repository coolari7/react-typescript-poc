import React from "react";
import { useToggle } from "../hooks/useToggle";

export type useModalProps = {
  modalVisible: boolean;
};
export function useModal(
  visible: boolean,
  overlayVisible: boolean
): useModalProps {
  const {
    visible: modalVisible,
    show: showModal,
    hide: hideModal,
  } = useToggle(visible);

  React.useLayoutEffect(() => {
    if (visible && !modalVisible) {
      showModal();
    }
  }, [overlayVisible]);

  React.useLayoutEffect(() => {
    if (!visible && modalVisible) {
      hideModal();
    }
  }, [visible]);

  return { modalVisible };
}
