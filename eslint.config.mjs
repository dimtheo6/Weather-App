import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    env: {
      browser: true,
      node: true,
    },
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "arrow-body-style": ["error", "always"],
    },
  },
];
