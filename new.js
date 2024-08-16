const prettierRules = require("./prettier");

const config = {
 extends: [
  // Pkgs: eslint-config-next
  "next/core-web-vitals",

  // Pkgs: @typescript-eslint/eslint-plugin eslint-plugin-promise eslint-plugin-import eslint-plugin-n  eslint-config-standard-with-typescript
  "standard-with-typescript",

  // Pkgs: prettier eslint-plugin-prettier eslint-config-prettier
  "plugin:prettier/recommended",
 ],
 plugins: [
  // Pkgs: eslint-plugin-classnames
  "classnames",
 ],
 rules: {
  // Prettier
  "prettier/prettier": ["error", prettierRules],

  // Permite usar ternário completo, ajuda na refatoração
  "no-unneeded-ternary": "off",

  // Força a retornar ao invés de usar else
  "no-else-return": ["error", { allowElseIf: false }],

  // Força a concatenação de strings com ${} ao invés de +
  "prefer-template": "error",

  // Impede de alterar o valor de um parâmetro de uma função
  "no-param-reassign": "error",

  // Permite não usar default export
  "import/prefer-default-export": "off",

  // Impede de importar o mui errado - recomendação na doc do mui
  "no-restricted-imports": [
   "error",
   {
    patterns: ["@mui/*/*/*"],
   },
  ],
  // -- TYPESCRIPT --
  // Permite colocar uma function em um parametro na function direto ex. param={functionX}
  "@typescript-eslint/no-misused-promises": "off",

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

  // Desativa indentação para o prettier resolver
  "@typescript-eslint/indent": "off",

  // Força informar quando um import é apenas uma tipagem
  "@typescript-eslint/consistent-type-imports": "error",

  // Desativa regra de não deixar usar /// (next,vite,native,etc usa)
  "@typescript-eslint/triple-slash-reference": "off",

  // Desabilita regra que impede usar funções sem retorno
  "@typescript-eslint/no-confusing-void-expression": "off",

  // Permite usar strings concatenadas com variáveis que não são strings
  "@typescript-eslint/restrict-template-expressions": "off",

  // -- REACT --

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
  // "react/react-in-jsx-scope": "off",

  // Desativa a obrigatoriedade de tipar as props (TS já faz isso)
  // "react/prop-types": "off",

  // Força fecha as tags de componentes React na mesma linha
  "react/self-closing-comp": "error",

  // Impede o uso de index como key em map
  "react/no-array-index-key": "error",

  // Força utilizar uma função cx no className
  "classnames/prefer-classnames-function": [
   "error",
   {
    maxSpaceSeparatedClasses: 0,
    functionName: "cx",
   },
  ],
 },
};

module.exports = config;
