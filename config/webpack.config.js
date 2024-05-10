const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const webpack = require('webpack');

let entries = {
  pack1: 'path/to/entry/point/pack1',
  pack2: 'path/to/entry/point/pack2'
};

module.exports = (env, argv) => {
  // const prod = argv.mode === "production";

  return {
    mode: "development",
    entry: [
      path.join(__dirname, '../packages/todo-client-react/src/index.tsx')
    ],
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "[name].js",
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      // rules: [
      //   {
      //     test: /\.tsx?$/,
      //     use: ["babel-loader", "ts-loader"],
      //   },
      // ],
    },
    plugins: [
      // new webpack.ProvidePlugin({
      //   React: "react",
      // }),
      // new HtmlWebpackPlugin({
      //   template: 'packages/todo-client-react/public/index.html',
      //   minify: process.env.NODE_ENV === 'production' ? {
      //     collapseWhitespace: true, // 빈칸 제거
      //     removeComments: true, // 주석 제거
      //   } : false,
      // }),
      // new CleanWebpackPlugin(),
    ]
  }
};
