import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import html from "@html-eslint/eslint-plugin";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["**.*.html"], plugins: { html }, extends: ["html/recommended"], language: "html/html", rules: { "html/no-duplicate-class": "error" }}
]);

