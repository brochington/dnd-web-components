const path = require("path");
const webpack = require("webpack");
const aliases = require("./aliases");

const babelLoaderConfig = {
  loader: "babel-loader",
  options: {
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
    ],
    presets: ["@babel/typescript"],
  },
};

module.exports = {
  entry: [
    path.resolve(process.cwd(), "src/index.ts"),
  ],
  output: {
    libraryTarget: 'umd',
    library: 'dnd-web-components',
    filename: "dnd-web-components.js",
    umdNamedDefine: true,
    path: path.resolve(process.cwd(), "dist"),
  },
  mode: "production",
  devtool: "eval-source-map",
  resolve: {
    alias: aliases,
    extensions: [".js", ".mjs", ".ts", ".tsx", ".wasm"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: path.join(process.cwd(), "src"),
        use: [babelLoaderConfig],
      },
      {
        test: /\.m?js$/,
        include: path.join(process.cwd(), "src"),
        use: [babelLoaderConfig],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [],
};
