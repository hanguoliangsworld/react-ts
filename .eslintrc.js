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
