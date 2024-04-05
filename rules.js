const prettierRules = require("./prettier");

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
 "import/prefer-default-export": "off",

 // Ordem dos imports alfabética e por tipo
 "import/order": ["error", { alphabetize: { order: "asc" } }],
};

const typescriptRules = {
 // Força usar type ao invés de interface
 "@typescript-eslint/consistent-type-definitions": ["error", "type"],

 // Permite omitir o tipo de retorno de funções
 "@typescript-eslint/explicit-function-return-type": "off",

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

 // Desativa regra de não deixar usar /// (next,vite,native,etc usa)
 "@typescript-eslint/triple-slash-reference": "off",

 // Desabilita regra que impede usar funções sem retorno
 "@typescript-eslint/no-confusing-void-expression": "off",

 // Ocorre qndo usamos strings concatenadas com variáveis que não são strings
 "@typescript-eslint/restrict-template-expressions": "off",

 // Ocorre qndo usamos uma funçao async ao clicar em um botão
 "@typescript-eslint/no-misused-promises": "off",
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
   functionName: "cx",
  },
 ],
};

const jsRulesOnTypescript = {
 files: ["*.js"],
 rules: {
  // Permite usar require (vários configs usam require)
  "@typescript-eslint/no-var-requires": "off",

  // Permite não tipar funções
  "@typescript-eslint/explicit-function-return-type": "off",
 },
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
  ignorePatterns: ["node_modules", "dist"],
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
  commonConfig.rules = {
   ...commonRules,
   ...typescriptRules,
   ...reactRules,
  };
 }

 if (env === "react" || env === "react-native") {
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

   "react-refresh",

   // Pkgs: eslint-plugin-classnames
   "classnames",
  ];
  commonConfig.rules = {
   ...commonRules,
   ...typescriptRules,
   ...reactRules,

   "react-refresh/only-export-components": [
    "warn",
    { allowConstantExport: true },
   ],
  };
 }

 if (env === "node") {
  commonConfig.extends = [
   // Pkgs: @typescript-eslint/eslint-plugin eslint-plugin-promise eslint-plugin-import eslint-plugin-n
   "standard-with-typescript",

   // Pkgs: prettier eslint-plugin-prettier eslint-config-prettier
   "plugin:prettier/recommended",
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
 } else {
  // Regras para arquivos JS

  if (!commonConfig.overrides) {
   commonConfig.overrides = [jsRulesOnTypescript];
  } else {
   commonConfig.overrides.push(jsRulesOnTypescript);
  }
 }

 return commonConfig;
};
