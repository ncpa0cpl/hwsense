const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");
const resolve = require("esbuild-plugin-resolve");

const p = (v) => path.resolve(__dirname, "..", v);

const isDev = process.argv.includes("--dev");
const watch = process.argv.includes("--watch");

async function main() {
  try {
    const outfile = p("dist/index.js");
    await esbuild.build({
      entryPoints: [p("src/index.tsx")],
      bundle: true,
      keepNames: true,
      minify: false,
      sourcemap: !isDev,
      watch,
      target: ["es6"],
      format: "esm",
      external: [
        "gi://Gtk?version=3.0",
        "gi://Gdk?version=3.0",
        "gi://GObject",
        "gi://Gtk",
        "gi://Gdk",
        "gi://GLib",
        "gi://Pango",
        "gi://Gio",
        "gi://GdkPixbuf",
        "gi://cairo",
      ],
      jsx: "transform",
      outfile,
      plugins: [
        resolve({
          react: "/home/owner/Documents/hwsense/node_modules/react",
        }),
      ],
    });

    const out = fs.readFileSync(outfile, "utf8").split("\n");

    const newOut = [];
    const imports = [];

    for (const line of out) {
      if (line.startsWith("import ")) {
        imports.push(line);
      } else {
        newOut.push(line);
      }
    }

    fs.writeFileSync(outfile, imports.join("\n") + "\n" + newOut.join("\n"));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
