import { resolve } from "path";
import { exec, ExecOptions } from "child_process";
import { promisify } from "util";
import { EOL } from "os";

const cwd = process.cwd();
const run = promisify(exec);
const build_dir = resolve(cwd, "dist");
const babel_base = [
  "babel",
  resolve(cwd, "src"),
  "--config-file",
  resolve(cwd, "babel.config.js"),
  "--extensions",
  [".ts", ".tsx"],
  "--ignore",
  ["**/*.stories.tsx", "**/*.spec.ts", "**/*.test.ts"],
  "--copy-files",
  "--no-copy-ignored",
];
const types_base = ["tsc", "--declaration", "--emitDeclarationOnly"];
const webpack_base = ["webpack", "--config", resolve(cwd, "webpack.config.ts")];

const cjs_dir = resolve(build_dir, "cjs");
const build_babel_cjs = babel_base.concat("--out-dir", cjs_dir);
const build_types_cjs = types_base.concat("--outDir", cjs_dir);
const build_babel_esm = babel_base.concat("--out-dir", build_dir);
const build_types_esm = types_base.concat("--outDir", build_dir);

function assemble(...cmds: { cmd: string; options?: ExecOptions }[]) {
  return async () => {
    for (let i = 0; i < cmds.length; i++) {
      console.log(`> ${cmds[i].cmd}${EOL}`);
      await run(cmds[i].cmd, cmds[i].options ?? {});
    }
  };
}
const build_cjs = assemble(
  { cmd: build_babel_cjs.join(" ") },
  { cmd: build_types_cjs.join(" ") }
);
const build_esm = assemble(
  {
    cmd: build_babel_esm.join(" "),
    options: { env: { ...process.env, BABEL_ENV: "esm" } },
  },
  { cmd: build_types_esm.join(" ") }
);
const build_umd = assemble({ cmd: webpack_base.join(" ") });

async function build() {
  await build_cjs();
  await build_esm();
  await build_umd();
}

// console.log(process.cwd());
build().catch((e) => {
  console.log(e);
});
