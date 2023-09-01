const prettierRules = require("./prettier");

module.exports = {
  extends: [
    // Pkgs:  eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-n
    "standard",

    // Pkgs: prettier eslint-plugin-prettier eslint-config-prettier
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": ["error", prettierRules],
  },
};
