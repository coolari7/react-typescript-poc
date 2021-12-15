import React from "react";
import { useToggle } from "../../hooks/useToggle";
import { Scale } from "../Animations/Scale";
import { Backdrop, BackdropProps } from "../Backdrop/Backdrop";

export interface ModalProps extends BackdropProps {}
export function Modal(props: ModalProps) {
  const { visible, children, onBackdropClick } = props;

  const { visible: modalVisible, show: showModal, hide: hideModal } = useToggle(
    visible
  );
  const {
    visible: backdropVisible,
    show: showBackdrop,
    hide: hideBackdrop,
  } = useToggle(visible);

  React.useLayoutEffect(() => {
    // if (visible && !backdropVisible) {
    //   showBackdrop();
    // }
    if (visible && !modalVisible) {
      showModal();
    }
    if (!visible) {
      hideBackdrop();
      hideModal();
    }
  }, [visible]);

  // React.useLayoutEffect(() => {
  //   if (visible && backdropVisible && !modalVisible) {
  //     showModal();
  //   }
  // }, [visible, backdropVisible]);

  const backdropClicked = React.useCallback(() => {
    hideModal();
    onBackdropClick();
  }, []);

  return (
    <Backdrop visible={backdropVisible} onBackdropClick={backdropClicked}>
      <div className="absolute inset-0">
        <div className="h-full flex justify-center items-center">
          <Scale scale={0} in={modalVisible}>
            <div className="bg-red-400 rounded-md">{children}</div>
          </Scale>
        </div>
      </div>
    </Backdrop>
  );
}
