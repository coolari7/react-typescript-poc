import React from "react";
import { Meta } from "@storybook/react";
import { Scale } from "./Scale";
import { Button } from "../Buttons/Button";
import { useToggle } from "../../hooks/useToggle";
import { Fade, Base } from "./Fade";

export default { title: "Components/Animations" } as Meta;

export const ScaleAnimation = () => {
  const { visible, toggle } = useToggle(false);

  return (
    <>
      <Button type="button" onClick={toggle}>
        Scale
      </Button>
      <div className="flex justify-center mt-2">
        <Scale in={visible} scale={0}>
          <div className="w-24 h-24 bg-red-400"></div>
        </Scale>
      </div>
    </>
  );
};

export const FadeAnimation = () => {
  const { visible, toggle } = useToggle(false);

  const H1 = ({
    className,
    children,
    ...rest
  }: {
    className: string;
    children: string;
  }) => (
    <h1 {...rest} className={className}>
      {children}
    </h1>
  );

  return (
    <>
      <Button type="button" onClick={toggle}>
        Fade
      </Button>
      <Base in={visible} timeout={200}>
        <H1 className="text-3xl text-red-300">Hola</H1>
      </Base>
      <div className="flex justify-center mt-2">
        <Fade visible={visible}>
          <div className="w-24 h-24 bg-red-400"></div>
        </Fade>
      </div>
    </>
  );
};
