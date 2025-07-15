import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const combinedGlobals = {
  ...globals.browser,
  ...globals.node,
};

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js, prettierPlugin }, extends: ["js/recommended", prettier],
    ignores: ["**/node_modules/**", "config/**", "**/dist/**", ],
  },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: combinedGlobals  } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      "@typescript-eslint/no-var-requires": 'off',
      "@typescript-eslint/no-var-requires": 'off',
      "@typescript-eslint/no-require-imports": 'off',
    }
  }
]);
