const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const WebpackBar = require("webpackbar");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: { app: "./src/js/app.ts" },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [require("autoprefixer")(), require("cssnano")()],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  output: {
    path: __dirname + "/dist",
    chunkFilename: "js/chunks/[name].js",
    publicPath: "./",
    filename: "js/[name].js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          sourceMap: true,
          mangle: {
            properties: {
              reserved: [
                "draw",
                "modelViewMatrix",
                "projectionMatrix",
                "normal",
                "normalMatrix",
                //WebFont Loader
                "google",
                "families",
                "text",
                //oes-vertex-attrib-array-polyfill
                "VERTEX_ARRAY_BINDING_OES",
                "createVertexArrayOES",
                "deleteVertexArrayOES",
                "isVertexArrayOES",
                "bindVertexArrayOES",
                "__OESVertexArrayObject",
              ],
            },
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: false,
      },
    },
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    publicPath: "/",
    inline: true,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new WebpackBar(),
  ],
};
