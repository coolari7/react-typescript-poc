import React from "react";
import { Meta } from "@storybook/react";
import { Menu, OptionShape2, Select2 as SelectComponent } from "./Menu";

export default {
  component: Menu,
  title: "Components/Menu",
} as Meta;

export const Default = () => {
  const values = ["Shampoo", "Sashimi", "Hazelberry", "Apples"];
  return (
    <Menu>
      <Menu.Button>Hola</Menu.Button>
      <Menu.Items values={values}></Menu.Items>
    </Menu>
  );
};

interface User {
  name: string;
  age: number;
}
export const Select = () => {
  const options: OptionShape2<User>[] = [
    { label: "Arijit", value: { name: "Arijit", age: 23 } },
    { label: "Arpit", value: { name: "Arpit", age: 24 } },
    { label: "Atharva", value: { name: "Atharva", age: 24 } },
    { label: "Abhinav", value: { name: "Abhinav", age: 23 } },
    { label: "Shubham", value: { name: "Shubham", age: 23 } },
    { label: "Pooja", value: { name: "Pooja", age: 22 } },
  ];
  const [value, setValue] = React.useState<OptionShape2<User>>(options[0]);

  React.useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="mt-32" style={{ height: "1000px" }}>
      <SelectComponent value={value} options={options} onChange={setValue} />
      <p>Block content for testing positioning</p>
    </div>
  );
};
