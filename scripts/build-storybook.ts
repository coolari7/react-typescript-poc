import { resolve } from "path";
import { exec } from "child_process";
import { promisify } from "util";

const run = promisify(exec);

const cwd = process.cwd();
const output_dir = resolve(__dirname, "../storybook-static");
const config_dir = resolve(cwd, ".storybook");

const build_storybook = [
  "build-storybook",
  "--config-dir",
  config_dir,
  "--output-dir",
  output_dir,
];

run(build_storybook.join(" ")).catch((e) => console.error(e));
