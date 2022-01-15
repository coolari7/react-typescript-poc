import React from "react";
import { Meta } from "@storybook/react";
import { Modal as ModalComponent } from "./Modal";
import { Button } from "../Buttons/Button";
import { useToggle } from "../hooks/useToggle";

export default { component: ModalComponent, title: "Components/Modal" } as Meta;

export const Modal = () => {
  const { visible, show, hide } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={show}>
        Open Modal
      </Button>
      <ModalComponent in={visible} onBackdropClick={hide}>
        <h1 className="text-5xl">Hola Tido My Name is Hakuna</h1>
        <Button type="button" onClick={hide}>
          Close
        </Button>
      </ModalComponent>
    </>
  );
};
