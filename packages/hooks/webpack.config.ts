import { resolve } from "path";
import { Configuration } from "webpack";

const cwd = process.cwd();

export default {
  entry: resolve(cwd, "src", "index.ts"),
  output: {
    path: resolve(cwd, "dist"),
    filename: "index.min.js",
    library: {
      type: "umd",
    },
  },
  externals: ["react"],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["babel-loader", "ts-loader"],
        include: resolve(__dirname, "src"),
        exclude: [/\.(stories|spec|test).tsx?$/],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  mode: "production",
} as Configuration;
