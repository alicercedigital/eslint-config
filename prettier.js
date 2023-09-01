const prettierRules = {
  // Default parameters from Prettier
  arrowParens: "always",
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  filepath: undefined,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  parser: undefined,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  rangeEnd: Infinity,
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  vueIndentScriptAndStyle: false,

  // Changed parameters
  endOfLine: "auto",
  printWidth: 75,
  trailingComma: "all",
};

module.exports = prettierRules;
