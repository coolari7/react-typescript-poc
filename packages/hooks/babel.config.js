module.exports = function (api) {
  const isESM = api.env("esm");

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: isESM ? false : "commonjs",
        },
      ],
      "@babel/preset-typescript",
    ],
  };
};
