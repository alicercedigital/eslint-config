module.exports = {
  extends: [
    // Pkgs: eslint-config-next
    "next/core-web-vitals",
  ],
  plugins: [
    // Pkgs: eslint-plugin-classnames
    "classnames",
  ],
  rules: {
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

    // Permite omitir o tipo de retorno de funções
    "@typescript-eslint/explicit-function-return-type": "off",

    // Permite usar variáveis sem ser booleanas em condições
    "@typescript-eslint/strict-boolean-expressions": "off",

    // Ignora a necessidade de usar void antes de promisses sem retorno
    "@typescript-eslint/no-floating-promises": "off",

    // Permite usar || ao invés de ??.
    // Com || uma string vazia é considerado falso e ?? não
    "@typescript-eslint/prefer-nullish-coalescing": "off",

    // Desativa indentação para o prettier resolver
    "@typescript-eslint/indent": "off",

    // Desabilita regra que impede usar funções sem retorno
    "@typescript-eslint/no-confusing-void-expression": "off",

    // Permite usar strings concatenadas com variáveis que não são strings
    "@typescript-eslint/restrict-template-expressions": "off",

    // -- REACT --
    // Força fecha as tags de componentes React na mesma linha
    "react/self-closing-comp": "error",

    // Força utilizar uma função cn no className
    "classnames/prefer-classnames-function": [
      "error",
      {
        maxSpaceSeparatedClasses: 0,
        functionName: "cn",
      },
    ],
  },
};
