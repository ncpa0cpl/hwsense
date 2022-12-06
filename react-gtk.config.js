const resolve = require("esbuild-plugin-resolve");

module.exports = () => {
  /** @type {import("react-gtk").Config} */
  const config = {
    entrypoint: "./src/index.tsx",
    outDir: "./dist",
    esbuildPlugins: [
      /**
       * TODO: once the renderer package is published, this
       * plugin can be removed, it is only necessary for
       * symlinked packages to work.
       */
      resolve({
        react: "/home/owner/Documents/hwsense/node_modules/react",
      }),
    ],
  };

  return config;
};
