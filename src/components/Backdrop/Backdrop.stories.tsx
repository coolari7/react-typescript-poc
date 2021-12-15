import React from "react";
import { Meta } from "@storybook/react";
import { Backdrop, NewBackdrop } from "./Backdrop";
import { Overlay } from "../Overlay/Overlay";
import { Button } from "../Buttons/Button";
import { useToggle } from "../../hooks/useToggle";
import { Scale } from "../Animations/Scale";

export default { component: Backdrop, title: "Components/Backdrop" } as Meta;

export const Default = () => {
  const { visible, show, hide } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={show}>
        Show Backdrop
      </Button>
      <Backdrop visible={visible} onBackdropClick={hide}>
        Hola
      </Backdrop>
    </>
  );
};

export const NewBackdopTest = () => {
  const { visible, show, hide } = useToggle(false);

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
  const { visible: modalVisible, show: showModal, hide: hideModal } = useToggle(
    visible
  );

  React.useLayoutEffect(() => {
    if (visible && !overlayVisible) {
      showOverlay();
    }
  }, [visible]);

  React.useLayoutEffect(() => {
    if (!visible && backdropVisible) {
      hideBackdrop();
    }
  }, [visible]);

  React.useLayoutEffect(() => {
    if (!visible && modalVisible) {
      hideModal();
    }
  }, [visible]);

  React.useLayoutEffect(() => {
    if (visible && !modalVisible) {
      showModal();
    }
  }, [overlayVisible]);

  React.useLayoutEffect(() => {
    if (visible && !backdropVisible) {
      showBackdrop();
    }
  }, [overlayVisible]);

  return (
    <>
      <Button type="button" onClick={show}>
        Show Backdrop
      </Button>
      <Overlay visible={overlayVisible}>
        <NewBackdrop
          visible={backdropVisible}
          onBackdropClick={hide}
          onExited={hideOverlay}
        />
        <div
          className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{ minWidth: "50%" }}
        >
          <Scale scale={0} in={modalVisible}>
            <div className="w-full h-full bg-white">
              <h1>Hola</h1>
              <h1>Hola</h1>
              <h1>Hola</h1>
              <h1>Hola</h1>
              <h1>Hola</h1>
              <h1>Hola</h1>
              <h1>Hola</h1>
            </div>
          </Scale>
        </div>
      </Overlay>
    </>
  );
};
