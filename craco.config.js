const CompressionWebpackPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const addPath = (dir) => path.join(__dirname, dir);
module.exports = {
  webpack: {
    // 别名
    alias: {
      "@": addPath("src"),
    },
    plugins: [
      // 打压缩包
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]", // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
        algorithm: "gzip", // 算法
        test: new RegExp("\\.(js|css)$"), // 压缩 js 与 css
        threshold: 10240, // 只处理比这个值大的资源。按字节计算
        minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
      }),
    ],
  },
  // 代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
};
