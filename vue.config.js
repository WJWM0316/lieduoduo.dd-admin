const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const resolve = dir => {
  return path.join(__dirname, dir);
};

console.log(process.env.VUE_APP_API);
module.exports = {
  lintOnSave: false,

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
  // 去除console
  configureWebpack: config => {
    if (process.env.NODE_ENV !== "test") {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true, // 注释console
              drop_console: true,
              pure_funcs: ["console.log"] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        })
      );
    }
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  }
};
