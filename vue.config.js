const webpack = require("webpack");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const resolve = dir => {
  return path.join(__dirname, dir);
};

console.log(process.env.VUE_APP_API);
module.exports = {
  lintOnSave: false,
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
  configureWebpack: {
    entry: {
      vendors: ["vue", "vue-router", "axios", "vuex"]
    },
    resolve: {
      alias: {
        PACKJSON: resolve("./"),
        "@": resolve("src"),
        IMAGES: resolve("src/assets/images"),
        UTIL: resolve("src/util"),
        API: resolve("src/api"),
        STORE: resolve("src/store"),
        COMPONENTS: resolve("src/components"),
        CONFIGS: resolve("src/configs"),
        STYLES: resolve("src/styles"),
        ICONFONT: resolve("src/assets/iconfont"),
        FILTERS: resolve("src/filters"),
        COLORS: resolve("src/eleui/colors")
      }
    },
    plugins: []
  },
  css: {},
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  }
};
