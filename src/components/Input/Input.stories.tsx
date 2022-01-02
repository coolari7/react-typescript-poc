import React from "react";
import { Meta } from "@storybook/react";
import { Input } from "./Input";

export default {
  component: Input,
  title: "Components/Input",
} as Meta;

export const Plain = () => {
  const [value, setValue] = React.useState("Buy apples");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Input
      value={value}
      onChange={onChange}
      invalid={false}
      placeholder="Grocery List"
    />
  );
};

export const WithError = () => {
  const [value, setValue] = React.useState("");
  const [invalid, setInvalid] = React.useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setInvalid(e.target.value === "" ? true : false);
  };

  return (
    <Input
      value={value}
      onChange={onChange}
      invalid={invalid}
      placeholder="Grocery List"
    />
  );
};
