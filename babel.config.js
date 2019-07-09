const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  configureWebpack: config => {
    config.optimization = {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    };
  },
  presets: ["@vue/app"]
};
