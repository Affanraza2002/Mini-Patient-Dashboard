module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "18" }, // change node version to the one you use
        modules: "auto"
      }
    ]
  ]
};