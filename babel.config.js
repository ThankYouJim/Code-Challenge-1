module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        pragma: "h",
        pragmaFrag: "Fragment",
      },
    ],
    [
      "babel-plugin-jsx-pragmatic",
      {
        module: "preact",
        import: "h",
        export: "h",
      },
    ],
  ],
};
