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

const commonRules = {
  // Prettier
  "prettier/prettier": ["error", prettierRules],

  // Permite usar ternário completo, ajuda na refatoração
  "no-unneeded-ternary": "off",

  // Força a retornar ao invés de usar else
  "no-else-return": ["error", { allowElseIf: false }],

  // Força quebrar linha após cada vírgula
  "comma-dangle": "off",

  // Força arrow function a usar {}
  "arrow-body-style": ["error", "always"],

  // Força arrow function a usar parenteses
  "arrow-parens": ["error", "always"],

  // Força a concatenação de strings com ${} ao invés de +
  "prefer-template": "error",

  // Força CRLF
  "linebreak-style": "off",

  // Impede de alterar o valor de um parâmetro de uma função
  "no-param-reassign": "error",

  // Força declarar funções como arrow function
  "func-style": ["error", "expression"],

  // Força usar default export
  "import/prefer-default-export": ["error"],

  // Ordem dos imports alfabética e por tipo
  "import/order": ["error", { alphabetize: { order: "asc" } }],
};

const typescriptRules = {
  // Permite usar variáveis sem ser booleanas em condições
  "@typescript-eslint/strict-boolean-expressions": "off",

  // Ignora a necessidade de usar void antes de promisses sem retorno
  "@typescript-eslint/no-floating-promises": "off",

  // Permite usar || ao invés de ??.
  // Com || uma string vazia é considerado falso e ?? não
  "@typescript-eslint/prefer-nullish-coalescing": "off",

  // Força aspas duplas
  "@typescript-eslint/quotes": ["error", "double"],

  // Força última vírgula em objetos e arrays
  "@typescript-eslint/comma-dangle": [
    "error",
    {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "always-multiline",
      exports: "always-multiline",
      functions: "always-multiline",
      enums: "always-multiline",
      generics: "ignore",
      tuples: "always-multiline",
    },
  ],

  // Força ponto e vírgula no final de cada linha
  "@typescript-eslint/semi": ["error", "always"],

  // Força ponto e vírgula para os types do typescript
  "@typescript-eslint/member-delimiter-style": "off",

  // Desativa indentação para o prettier resolver
  "@typescript-eslint/indent": "off",

  // Força informar quando um import é apenas uma tipagem
  "@typescript-eslint/consistent-type-imports": "error",
};

const reactRules = {
  // Impede de usar && e || em JSX/TSX
  "no-restricted-syntax": [
    "error",
    {
      selector:
        ":matches(JSXElement, JSXFragment) > JSXExpressionContainer > LogicalExpression[operator!='??']",
      message: "Please use ternary operator instead",
    },
  ],

  // Permite usar JSX ou TSX sem importar React
  "react/react-in-jsx-scope": "off",

  // Desativa a obrigatoriedade de tipar as props (TS já faz isso)
  "react/prop-types": "off",

  // Força fecha as tags de componentes React na mesma linha
  "react/self-closing-comp": "error",

  // Impede o uso de index como key em map
  "react/no-array-index-key": "error",

  // Força usar arrow function pra tudo
  "react/function-component-definition": [
    "error",
    {
      namedComponents: "arrow-function",
      unnamedComponents: "arrow-function",
    },
  ],

  // Força utilizar uma função clsx no className
  "classnames/prefer-classnames-function": [
    "error",
    {
      maxSpaceSeparatedClasses: 0,
      functionName: "clsx",
    },
  ],
};

/**
 * @param {('next'|'node'|'nodejs'|'react')} env
 * @returns {import("eslint").Linter.Config}
 */

exports.generateConfig = (env) => {
  const commonConfig = {
    env: {
      es2021: true,
      node: true,
    },
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  };

  if (env === "next") {
    commonConfig.env.browser = true;
    commonConfig.extends = [
      // Pkgs: eslint-config-next
      "next/core-web-vitals",

      // Pkgs: @typescript-eslint/eslint-plugin eslint-plugin-promise eslint-plugin-import eslint-plugin-n
      "standard-with-typescript",

      // Pkgs: prettier eslint-plugin-prettier eslint-config-prettier
      "plugin:prettier/recommended",
    ];
    commonConfig.plugins = [
      // Pkgs: eslint-plugin-classnames
      "classnames",
    ];
    commonConfig.overrides = [
      {
        files: ["next-env.d.ts"],
        rules: {
          // Desativa regra para arquivo do next
          "@typescript-eslint/triple-slash-reference": "off",
        },
      },
      {
        files: ["*.js"],
        rules: {
          // Permite usar require (vários configs usam require)
          "@typescript-eslint/no-var-requires": "off",
        },
      },
    ];
    commonConfig.rules = {
      ...commonRules,
      ...typescriptRules,
      ...reactRules,
    };
  }

  if (env === "react") {
    commonConfig.env.browser = true;
    commonConfig.extends = [
      // Pkgs: eslint-plugin-react
      "plugin:react/recommended",

      // Pkgs: @typescript-eslint/eslint-plugin eslint-plugin-promise eslint-plugin-import eslint-plugin-n
      "standard-with-typescript",

      // Pkgs: prettier eslint-plugin-prettier eslint-config-prettier
      "plugin:prettier/recommended",
    ];
    commonConfig.plugins = [
      // Pkgs: eslint-plugin-react
      "react",

      // Pkgs: eslint-plugin-classnames
      "classnames",
    ];
    commonConfig.overrides = [
      {
        files: ["*.js"],
        rules: {
          // Permite usar require (vários configs usam require)
          "@typescript-eslint/no-var-requires": "off",
        },
      },
    ];
    commonConfig.rules = {
      ...commonRules,
      ...typescriptRules,
      ...reactRules,
    };
  }

  if (env === "node") {
    commonConfig.extends = [
      // Pkgs: @typescript-eslint/eslint-plugin eslint-plugin-promise eslint-plugin-import eslint-plugin-n
      "standard-with-typescript",

      // Pkgs: prettier eslint-plugin-prettier eslint-config-prettier
      "plugin:prettier/recommended",
    ];
    commonConfig.overrides = [
      {
        files: ["*.js"],
        rules: {
          // Permite usar require (vários configs usam require)
          "@typescript-eslint/no-var-requires": "off",
        },
      },
    ];
    commonConfig.rules = {
      ...commonRules,
      ...typescriptRules,
    };
  }

  if (env === "nodejs") {
    commonConfig.extends = [
      // Pkgs:  eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-n
      "standard",

      // Pkgs: prettier eslint-plugin-prettier eslint-config-prettier
      "plugin:prettier/recommended",
    ];
    commonConfig.rules = commonRules;
  }

  return commonConfig;
};
