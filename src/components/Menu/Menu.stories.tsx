import React from "react";
import { Story, Meta } from "@storybook/react";
import { Menu, MenuProps } from "./Menu";

export default {
  component: Menu,
  title: "Components/Menu",
} as Meta;

const Template: Story<MenuProps> = ({ ...args }) => <Menu {...args}></Menu>;

export const Default = () => {
  const values = ["Shampoo", "Sashimi", "Hazelberry", "Apples"];
  return (
    <Menu>
      <Menu.Button>Hola</Menu.Button>
      <Menu.Items values={values}></Menu.Items>
    </Menu>
  );
};
