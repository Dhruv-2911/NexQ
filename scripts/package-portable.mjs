#!/usr/bin/env node
// Packs a Windows build into a portable zip that runs without installing:
// the app plus the DLLs the installer normally puts next to it (ONNX Runtime
// and the Microsoft C++ runtime), the license and the third-party notices, as
// listed in tauri.windows.conf.json. Run it on Windows after `npx tauri build`; `npm run package:portable`
// does both.
//
// Output: portable/<product>_<version>_x64_portable.zip

import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (...parts) => JSON.parse(readFileSync(join(root, ...parts), "utf8"));

const { version } = readJson("package.json");
const { productName } = readJson("src-tauri", "tauri.conf.json");
const crateName = readFileSync(join(root, "src-tauri", "Cargo.toml"), "utf8").match(/^name = "(.+)"$/m)[1];
const resources = readJson("src-tauri", "tauri.windows.conf.json").bundle.resources;

const release = join(root, "src-tauri", "target", "release");
const exe = [`${crateName}.exe`, `${productName}.exe`].map((n) => join(release, n)).find(existsSync);
if (!exe) {
  console.error(`No built app in ${release}. Run "npx tauri build" first.`);
  process.exit(1);
}

const name = `${productName}_${version}_x64_portable`;
const outRoot = join(root, "portable");
const outDir = join(outRoot, name);
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

copyFileSync(exe, join(outDir, `${productName}.exe`));
for (const [from, to] of Object.entries(resources)) {
  const src = join(root, "src-tauri", from);
  if (!existsSync(src)) {
    console.error(`Missing ${src}.${src.endsWith(".dll") ? ' Run "node scripts/fetch-onnxruntime.mjs" (npx tauri build runs it).' : ""}`);
    process.exit(1);
  }
  copyFileSync(src, join(outDir, to));
}

const zip = join(outRoot, `${name}.zip`);
rmSync(zip, { force: true });
if (process.platform === "win32") {
  // Windows 10 and later ship bsdtar, which writes zip files with -a.
  execFileSync("tar", ["-a", "-c", "-f", zip, "-C", outRoot, name], { stdio: "inherit" });
} else {
  execFileSync("zip", ["-r", "-q", zip, name], { cwd: outRoot, stdio: "inherit" });
}
console.log(`Portable build: ${zip}`);
