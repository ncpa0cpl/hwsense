import resolve from "esbuild-plugin-resolve";
import { BuildConfig } from "react-gnome";

export default () => {
  const config: BuildConfig = {
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
    giVersions: {
      Soup: "2.4",
    },
  };

  return config;
};
