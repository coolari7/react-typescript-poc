import { useState, useCallback } from "react";

export type useToggleProps = {
  visible: boolean;
  show(): void;
  hide(): void;
  toggle(): void;
  set(bool: boolean): void;
};
export function useToggle(initialState = false): useToggleProps {
  const [visible, setVisibility] = useState(initialState);

  const show = useCallback(() => setVisibility(true), []);
  const hide = useCallback(() => setVisibility(false), []);
  const toggle = useCallback(() => setVisibility((prev) => !prev), []);
  const set = useCallback((bool: boolean) => setVisibility(bool), []);

  return { visible, show, hide, toggle, set };
}
