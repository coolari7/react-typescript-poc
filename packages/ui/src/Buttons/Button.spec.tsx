import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  test("has role 'button'", () => {
    render(<Button type="button">Click Me</Button>);
    screen.getByRole("button");
  });

  test("triggers 'onClick' correctly", () => {
    const onClick = jest.fn();

    render(
      <Button type="button" onClick={onClick}>
        Click Me
      </Button>
    );

    userEvent.click(screen.getByRole("button"));

    expect(onClick).toBeCalledTimes(1);
  });
});
