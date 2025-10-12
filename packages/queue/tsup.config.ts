import fs from "fs";
import { spawn } from "node:child_process";
import { defineConfig } from "tsup";

export default defineConfig((options) => {
    return {
        entry: ["src/index.ts"],
        dts: true,
        esbuildPlugins: [],
        sourcemap: true,
        clean: true,
        target: "es2015",
        // minify: true,
        bundle: true,
        format: ["cjs", "esm"],
        external: ["react"],
        async onSuccess() {
            if (options.watch) {
                const child = spawn("node", ["dist/index.js"]);
                child.stdout.on("data", (data) => {
                    console.log(data.toString());
                });
                child.stderr.on("data", (data) => {
                    console.error(data.toString());
                });
                child.on("close", (code) => {
                    console.log(`child process exited with code ${code}`);
                });
            }
        },
    };
});
