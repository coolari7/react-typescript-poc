import React from "react";
import { Meta } from "@storybook/react";
import { Backdrop } from "./Backdrop";
import { Button } from "../Buttons/Button";
import { useToggle } from "../../hooks/useToggle";

export default { component: Backdrop, title: "Components/Backdrop" } as Meta;

export const Default = () => {
  const { visible, show, hide } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={show}>
        Show Backdrop
      </Button>
      <Backdrop in={visible} onBackdropClick={hide}>
        Hola
      </Backdrop>
    </>
  );
};
