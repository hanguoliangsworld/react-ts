const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");
const webpack = require("webpack");
const path = require("path");
// 是否是生产环境
const isProduction = process.env.NODE_ENV === "production";

const commonPlugins = [
  {
    plugin: CracoLessPlugin,
    options: {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            "@primary-color": "#00A2FF",
            "@link-color": "#00A2FF",
          },
          javascriptEnabled: true,
        },
      },
      modifyLessModuleRule: (lessModuleRule, context) => {
        lessModuleRule.test = /\.less$/;
        lessModuleRule.exclude = /node_modules/;
        const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
        cssLoader.options.modules = {
          exportLocalsConvention: "camelCase",
          localIdentName: "[local]_[hash:base64:5]",
        };
        return lessModuleRule;
      },
      modifyLessRule: (lessRule, context) => {
        lessRule.test = /\.less$/;
        lessRule.include = /node_modules/;
        lessRule.exclude = undefined;

        return lessRule;
      },
    },
  },
];
const productionPlugins = [
  // 打包进度
  new SimpleProgressWebpackPlugin(),
  // 打压缩包
  new CompressionWebpackPlugin({
    filename: "[path].gz[query]", // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
    algorithm: "gzip", // 算法
    test: new RegExp("\\.(js|css)$"), // 压缩 js 与 css
    threshold: 10240, // 只处理比这个值大的资源。按字节计算
    minRatio: 0.8, // 只有压缩率比这个值小的资源才会被处理
  }),
  // 压缩ES6
  new UglifyJsPlugin({
    parallel: true,
    uglifyOptions: {
      // 在UglifyJs删除没有用到的代码时不输出警告
      warnings: false,
      // debug false
      output: {
        comments: false,
        beautify: false,
        // debug true
      },
      compress: {
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: isProduction ? true : false,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      },
    },
  }),
];
const devPlugins = [];

module.exports = {
  webpack: {
    // 别名
    alias: {
      "@": path.resolve("src"),
    },
  },
  plugins: isProduction
    ? [...productionPlugins, ...commonPlugins]
    : [...devPlugins, ...commonPlugins],
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
