/* module.exports = {
  extends: ['tuya-panel'],
  rules: {
    camelcase: 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'one-var': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 1,
    'import/no-unresolved': 0,
    'no-shadow': 0,
    'no-console': 0,
    'react/require-default-props': 0,
    indent: 0,
    'no-restricted-properties': [
      2,
      {
        object: 'disallowedObjectName',
        property: 'disallowedPropertyName',
      },
    ],
  },
};
 */
module.exports = {
  extends: ["react-app", "plugin:prettier/recommended"],
  rules: {
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": 0,
    "prettier/prettier": [
      "error",
      {
        singleQuote: false, //使用单引号
        trailingComma: "all", //有效的尾随逗号（对象、数组等）
        bracketSameLine: true,
        endOfLine: "auto",
      },
    ],
  },
};
