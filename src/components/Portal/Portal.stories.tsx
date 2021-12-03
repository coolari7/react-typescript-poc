import React from "react";
import { Meta } from "@storybook/react";
import { Portal } from "./Portal";
import { Backdrop } from "../Backdrop/Backdrop";
import { Button } from "../Buttons/Button";

export default {
  component: Portal,
  title: "Components/Portal",
} as Meta;

export const Default = () => {
  return (
    <>
      <h1>Outside Portal</h1>
      <Portal>
        <h1>Inside Portal</h1>
      </Portal>
    </>
  );
};

export const BackdropPortal = () => {
  const [visible, setVisibility] = React.useState(false);

  return (
    <>
      <Button type="button" onClick={() => setVisibility(!visible)}>
        Show Backdrop
      </Button>
      {visible && (
        <Portal>
          <Backdrop visible={visible} onClose={() => setVisibility(false)} />
        </Portal>
      )}
      {/* <Portal visible={visible}>
        <Backdrop visible={visible} onClose={() => setVisibility(false)} />
      </Portal> */}
    </>
  );
};
