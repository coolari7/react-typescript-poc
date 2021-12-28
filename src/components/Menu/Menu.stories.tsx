import React from "react";
import { Meta } from "@storybook/react";
import { Menu as MenuComponent } from "./Menu";
import { MenuControl } from "./MenuControl";
import { MenuOptions } from "./MenuOptions";

export default {
  component: MenuComponent,
  title: "Components/Menu",
} as Meta;

export const Menu = () => {
  return (
    <MenuComponent>
      <MenuControl>
        <span className="material-icons text-gray-400 cursor-pointer">
          more_vert
        </span>
      </MenuControl>
      <MenuOptions className="shadow-lg bg-transparent max-h-52">
        <li
          className="p-2 text-sm text-gray-700 hover:bg-gray-200"
          onClick={() => console.log("Arijit")}
        >
          Arijit
        </li>
        <a
          className="block p-2 text-sm text-gray-700 hover:bg-gray-200"
          href="https://www.google.com"
          target="_blank"
        >
          Google
        </a>
        <li
          className="p-2 text-sm text-gray-700 hover:bg-gray-200"
          onClick={() => console.log("Hakuna")}
        >
          Hakuna
        </li>
      </MenuOptions>
    </MenuComponent>
  );
};
