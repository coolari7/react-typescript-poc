import React from "react";
import { Meta } from "@storybook/react";
import { Overlay as OverlayComponent } from "./Overlay";
import { Button } from "../Buttons/Button";
import { useToggle } from "../hooks/useToggle";

export default {
  component: OverlayComponent,
  title: "Components/Overlay",
} as Meta;

export const Overlay = () => {
  const { visible, show, hide } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={show}>
        Show Overlay
      </Button>
      <OverlayComponent visible={visible} onOverlayClick={hide}>
        <h1>Check Developer Tools</h1>
      </OverlayComponent>
    </>
  );
};
