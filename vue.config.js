const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const resolve = dir => {
  return path.join(__dirname, dir);
};


module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: {
      vendors: ["vue", "vue-router", "axios", "vuex"]
    },
    resolve: {
      alias: {
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
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true, // console
            drop_console: true,
            pure_funcs:['console.log'] // 移除console
          },
        },
        sourceMap: false,
        parallel: true,
      })
    ]
  },
  css: {},
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  }
};
