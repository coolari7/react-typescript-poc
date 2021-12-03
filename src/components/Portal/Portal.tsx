import React from "react";
import ReactDOM from "react-dom";
import { usePortalContainer } from "./usePortalContainer";

interface PortalContainerProps {
  children: React.ReactNode;
}

export interface PortalProps extends PortalContainerProps {}
export function Portal({ children }: PortalProps) {
  const container = usePortalContainer();
  return ReactDOM.createPortal(
    <div className="z-10 absolute inset-0">{children}</div>,
    container
  );
}
