const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: "development",
  entry: { main: "./src/index.ts" },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /test\.ts$/,
        use: "mocha-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.hbs/,
        loader: "handlebars-loader",
        exclude: /(node_modules|bower_components)/,
      },
    ],

  },
  devServer: {
    static: path.join(__dirname, "./dist"),
    historyApiFallback: true,
    compress: true,
    port: 4000,
    open: true,
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      handlebars: "handlebars/dist/handlebars.js",
      hbs: "handlebars-loader",
    },
  },
  optimization: {
    runtimeChunk: "single",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
