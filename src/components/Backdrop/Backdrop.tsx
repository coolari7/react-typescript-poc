import styled from "@emotion/styled";
import React from "react";
import { Fade, FadeProps } from "../Animations/Fade";
import { Portal } from "../Portal/Portal";

styled(Portal)``;

export interface BackdropProps extends Omit<FadeProps, "children"> {
  onClose(): void;
}
export function Backdrop({ visible, onClose }: BackdropProps) {
  return (
    <Fade visible={visible}>
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-500 bg-opacity-50"
      />
    </Fade>
  );
}
