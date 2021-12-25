import React from "react";
import { useModalProps } from "./useModal";
import { Scale, ScaleProps } from "../Animations/Scale";

type ModalContentProps = useModalProps & {
  children: React.ReactNode;
} & ScaleProps;
export function ModalContent(props: ModalContentProps) {
  const { modalVisible = false, children, ...rest } = props;

  return (
    <div
      className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2"
      style={{ minWidth: "50%" }}
    >
      <Scale {...rest} in={modalVisible}>
        <div className="w-full h-full bg-white">{children}</div>
      </Scale>
    </div>
  );
}
