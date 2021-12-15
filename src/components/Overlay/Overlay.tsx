import React from "react";
import { createPortal } from "react-dom";

interface OverlayProps {
  visible: boolean;
  children: React.ReactNode;
  onOverlayClick?(): void;
  container?: Element;
}
export function Overlay(props: OverlayProps) {
  const { visible, children, container, onOverlayClick } = props;

  return visible
    ? createPortal(
        <div
          id="sns__overlay"
          className="fixed inset-0 z-10"
          onClick={onOverlayClick}
        >
          {children}
        </div>,
        container || document.body
      )
    : null;
}
