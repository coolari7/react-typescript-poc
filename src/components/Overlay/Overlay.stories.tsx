import React from "react";
import { Meta } from "@storybook/react";
import { Overlay } from "./Overlay";
import { Button } from "../Buttons/Button";
import { useToggle } from "../../hooks/useToggle";

export default { component: Overlay, title: "Components/Overlay" } as Meta;

export const OverlayDemo = () => {
  const { visible, show, hide } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={show}>
        Show Overlay
      </Button>
      <Overlay visible={visible} onOverlayClick={hide}>
        <h1>Check Developer Tools</h1>
      </Overlay>
    </>
  );
};
