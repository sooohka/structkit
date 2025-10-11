import { includeIgnoreFile } from "@eslint/compat";
import * as path from "node:path";

export default [
  includeIgnoreFile(path.join(import.meta.dirname, ".gitignore")),
  {
    ignores: [
      ".github/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/.cache/**",
      "**/.turbo/**",
      "**/*.config.*",
      "**/turbo/**",
    ],
  },
  {
    plugins: {},
    rules: {},
  },
];
