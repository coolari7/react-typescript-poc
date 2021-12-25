import React from "react";
import { Fade, FadeProps } from "../Animations/Fade";

export type BackdropOwnProps = {
  onBackdropClick(): void;
};
type BackdropProps = FadeProps & BackdropOwnProps;
export function Backdrop(props: BackdropProps) {
  const { in: inProp, onBackdropClick, ...rest } = props;

  return (
    <Fade {...rest} in={inProp}>
      <div
        onClick={onBackdropClick}
        className="absolute inset-0 bg-gray-500 bg-opacity-50"
      />
    </Fade>
  );
}
