import React from "react";
import { Meta } from "@storybook/react";
import { Backdrop as BackdropComponent } from "./Backdrop";
import { Button } from "../Buttons/Button";
import { useToggle } from "../hooks/useToggle";

export default {
  component: BackdropComponent,
  title: "Components/Backdrop",
} as Meta;

export const Backdrop = () => {
  const { visible, show, hide } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={show}>
        Show Backdrop
      </Button>
      <BackdropComponent in={visible} onBackdropClick={hide}>
        Hola
      </BackdropComponent>
    </>
  );
};
