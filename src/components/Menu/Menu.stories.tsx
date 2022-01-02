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
    <div style={{ height: "1000px", marginTop: "700px" }}>
      <MenuComponent>
        <MenuControl>
          <span className="material-icons text-gray-400 cursor-pointer">
            more_vert
          </span>
        </MenuControl>
        <MenuOptions className="bg-transparent max-h-52 border border-blue-500">
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
            rel="noreferrer"
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
    </div>
  );
};
