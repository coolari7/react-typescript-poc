import { useState, useCallback } from "react";

export function useToggle(initialState = false) {
  const [visible, setVisibility] = useState(initialState);

  const show = useCallback(() => setVisibility(true), []);
  const hide = useCallback(() => setVisibility(false), []);
  const toggle = useCallback(() => setVisibility((prev) => !prev), []);
  const set = useCallback((bool: boolean) => setVisibility(bool), []);

  return { visible, show, hide, toggle, set };
}
