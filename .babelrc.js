module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        targets: ["> 1% in JP", "Safari >= 10"],
        modules: false,
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"],
};
