import React from "react";
import { Animate } from "../Animations/Animate";
import { useModal } from "../Modal/useModal";
import { Overlay } from "../Overlay/Overlay";
import { useOverlay } from "../Overlay/useOverlay";
import { useTheme } from "../useTheme";
import { SelectProps, SelectRef } from "./Select";
import { SelectOption } from "./SelectOption";

export type SelectOptionsProps<T> = Pick<
  SelectProps<T>,
  "options" | "onChange"
> &
  SelectRef & {
    in: boolean;
    onOptionsClick(): void;
  };
export function SelectOptions<T>(props: SelectOptionsProps<T>) {
  const theme = useTheme();
  const {
    options = [],
    in: inProp = false,
    onChange: onOptionChange,
    onOptionsClick,
    controlRef,
  } = props;
  const { overlayVisible, hideOverlay } = useOverlay(inProp);
  const { modalVisible } = useModal(inProp, overlayVisible);

  const getStyles = React.useCallback((): React.CSSProperties => {
    if (controlRef.current) {
      const {
        bottom,
        left,
        width,
      } = controlRef.current.getBoundingClientRect();
      return {
        top: `${bottom}px`,
        left: `${left}px`,
        width: `${width}px`,
      };
    }
    return {};
  }, [controlRef.current]);

  const mappedOptions = options.map((option) => (
    <SelectOption
      option={option}
      onChange={onOptionChange}
      key={option.label}
    />
  ));

  return (
    <Overlay visible={overlayVisible} onOverlayClick={onOptionsClick}>
      <Animate
        in={modalVisible}
        onExited={hideOverlay}
        defaultStyles={{
          transform: `scaleY(0)`,
          opacity: "0",
          transformOrigin: "50% 0",
          transitionTimingFunction: "ease",
          transition: `opacity ${theme.timeout}ms, transform ${theme.timeout}ms`,
        }}
        transitionStyles={{
          entering: {
            transform: "none",
            opacity: "1",
          },
          entered: {
            transform: "none",
            opacity: "1",
          },
        }}
      >
        <ul
          style={getStyles()}
          role="listbox"
          className="shadow-lg absolute w-full bg-white max-h-52 overflow-auto"
        >
          {mappedOptions}
        </ul>
      </Animate>
    </Overlay>
  );
}
