import React from "react";
import { Meta } from "@storybook/react";
import { Scale as ScaleComponent } from "./Scale";
import { Fade as FadeComponent } from "./Fade";
import { Button } from "../Buttons/Button";
import { useToggle } from "../hooks/useToggle";

export default { title: "Components/Animations" } as Meta;

export const Scale = () => {
  const { visible, toggle } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={toggle}>
        Scale
      </Button>
      <div className="flex justify-start mt-2">
        <ScaleComponent in={visible} scale={0} unmountOnExit>
          <div className="w-24 h-24 bg-red-400"></div>
        </ScaleComponent>
      </div>
    </>
  );
};

export const Fade = () => {
  const { visible, toggle } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={toggle}>
        {visible ? "Fade Out" : "Fade In"}
      </Button>
      <div className="flex justify-start mt-2">
        <FadeComponent in={visible} unmountOnExit>
          <div className="w-24 h-24 bg-red-400"></div>
        </FadeComponent>
      </div>
    </>
  );
};
