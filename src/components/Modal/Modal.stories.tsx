import React from "react";
import { Meta } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Buttons/Button";
import { useToggle } from "../../hooks/useToggle";

export default { component: Modal, title: "Components/Modal" } as Meta;

export const Default = () => {
  const { visible, show, hide } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={show}>
        Open Modal
      </Button>
      <Modal visible={visible} onBackdropClick={hide}>
        <h1 className="text-5xl">Hola Tido My Name is Hakuna</h1>
      </Modal>
    </>
  );
};
