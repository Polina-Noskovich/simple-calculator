/* eslint-disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      filename: isProduction ? "bundle.[contenthash].js" : "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    mode: isProduction ? "production" : "development",

    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 9000,
      open: true,
      hot: true,
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          type: "javascript/auto",
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
        inject: "body",
      }),
    ],

    optimization: {
      minimize: isProduction,
    },
  };
};
