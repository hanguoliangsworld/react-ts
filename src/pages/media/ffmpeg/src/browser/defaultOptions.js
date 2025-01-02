const resolveURL = require("resolve-url");

const devDependencies = {
  "@babel/core": "^7.12.3",
  "@babel/preset-env": "^7.12.1",
  "@ffmpeg/core": "^0.10.0",
  "@types/emscripten": "^1.39.4",
  "babel-loader": "^8.1.0",
  chai: "^4.2.0",
  cors: "^2.8.5",
  eslint: "^7.12.1",
  "eslint-config-airbnb-base": "^14.1.0",
  "eslint-plugin-import": "^2.22.1",
  express: "^4.17.1",
  mocha: "^8.2.1",
  "mocha-headless-chrome": "^2.0.3",
  "npm-run-all": "^4.1.5",
  "wait-on": "^5.3.0",
  webpack: "^5.3.2",
  "webpack-cli": "^4.1.0",
  "webpack-dev-middleware": "^4.0.0",
};
/*
 * Default options for browser environment
 */
module.exports = {
  corePath:
    typeof process !== "undefined" && process.env.FFMPEG_ENV === "development"
      ? resolveURL("/node_modules/@ffmpeg/core/dist/ffmpeg-core.js")
      : `https://unpkg.com/@ffmpeg/core@${devDependencies[
          "@ffmpeg/core"
        ].substring(1)}/dist/ffmpeg-core.js`,
};
