module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-destructuring", { loose: true }]
  ]
};
