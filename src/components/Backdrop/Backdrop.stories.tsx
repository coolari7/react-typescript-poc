import React from "react";
import { Meta } from "@storybook/react";
import { Backdrop } from "./Backdrop";
import { Button } from "../Buttons/Button";

export default { component: Backdrop, title: "Components/Backdrop" } as Meta;

export const Default = () => {
  const [visible, setVisibility] = React.useState(false);

  return (
    <>
      <Button type="button" onClick={() => setVisibility(!visible)}>
        Show Backdrop
      </Button>
      <Backdrop visible={visible} onClose={() => setVisibility(false)} />
    </>
  );
};
