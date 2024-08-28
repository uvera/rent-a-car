// The source code including full typescript support is available at:
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

// Common configuration applying to client and server configuration
const { generateWebpackConfig, merge } = require("shakapacker");

const commonOptions = {
  optimization: {
    runtimeChunk: "single",
  },
  resolve: {
    extensions: [".css", ".scss", ".ts", ".tsx", ".js", ".jsx"],
  },
};
// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () =>
  merge({}, generateWebpackConfig(), commonOptions);

module.exports = commonWebpackConfig;
