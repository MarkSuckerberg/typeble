import prettier from "eslint-config-prettier";
import path from "node:path";
import js from "@eslint/js";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";
import importSort from "eslint-plugin-simple-import-sort";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommendedTypeChecked,
	prettier,
	{
		languageOptions: {
			parserOptions: {
				globals: { ...globals.browser, ...globals.node },
				projectService: true,
			},
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			"no-undef": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-floating-promises": "error",
		},
		plugins: {
			importSort,
		},
	},
	{
		// Override or add rule settings here, such as:
		// 'svelte/button-has-type': 'error'
		rules: {},
	}
);
