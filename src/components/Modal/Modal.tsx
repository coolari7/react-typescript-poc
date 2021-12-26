import React from "react";
import { ScaleProps } from "../Animations/Scale";
import { AnimateTransitionProps } from "../Animations/Animate";
import { BackdropOwnProps, Backdrop } from "../Backdrop/Backdrop";
import { Overlay } from "../Overlay/Overlay";
import { useBackdrop } from "../Backdrop/useBackdrop";
import { useModal } from "./useModal";
import { ModalContent } from "./ModalContent";
import { useOverlay } from "../Overlay/useOverlay";

export type ModalProps = BackdropOwnProps & { in: boolean } & {
  backdropTransitionProps?: AnimateTransitionProps;
  modalTransitionProps?: ScaleProps;
} & { children: React.ReactNode };
export function Modal(props: ModalProps) {
  const {
    in: inProp = false,
    children,
    onBackdropClick,
    backdropTransitionProps,
    modalTransitionProps,
  } = props;

  const { overlayVisible, hideOverlay } = useOverlay(inProp);
  const { backdropVisible } = useBackdrop(inProp, overlayVisible);
  const { modalVisible } = useModal(inProp, overlayVisible);

  return (
    <Overlay visible={overlayVisible}>
      <Backdrop
        {...backdropTransitionProps}
        in={backdropVisible}
        onBackdropClick={onBackdropClick}
        onExited={hideOverlay}
      />
      <ModalContent
        {...modalTransitionProps}
        scale={0}
        modalVisible={modalVisible}
      >
        {children}
      </ModalContent>
    </Overlay>
  );
}
