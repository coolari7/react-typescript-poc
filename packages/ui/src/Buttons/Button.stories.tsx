import React from "react";
import { Story, Meta } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

export default {
  component: Button,
  title: "Components/Button",
  argTypes: {
    type: {
      options: ["button", "reset", "submit"],
      control: {
        type: "select",
      },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = ({ children, type, ...args }) => (
  <Button type={type} {...args}>
    {children}
  </Button>
);

export const Default = Template.bind({});
Default.args = {
  children: "Submit",
  type: "button",
  variant: "info",
};
