const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require("html-beautify-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const WebpackBar = require("webpackbar");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/js/app.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: [require("autoprefixer")(), require("cssnano")()]
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    chunkFilename: "js/chunks/[name].js",
    publicPath: "./",
    filename: "js/app.js"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            properties: {
              reserved: [
                "draw",
                "modelViewMatrix",
                "projectionMatrix",
                "normal",
                "normalMatrix",
                "google",
                "families",
                "text"
              ]
            }
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: false
      }
    }
  },
  devServer: {
    contentBase: "./dist",
    publicPath: "/",
    inline: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async"
    }),
    new ExtractTextPlugin({
      filename: "css/app.css"
    }),
    new HtmlBeautifyPlugin({
      config: {
        html: {
          end_with_newline: true,
          indent_with_tabs: true,
          indent_inner_html: false,
          preserve_newlines: true,
          unformatted: []
        }
      },
      replace: [' type="text/javascript"']
    }),
    new WebpackBar()
  ]
};
