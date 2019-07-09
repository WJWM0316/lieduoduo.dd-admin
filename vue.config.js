const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 压缩css、js
const productionGzipExtensions = ['js', 'css']; // 要压缩的文件
const resolve = dir => {
  return path.join(__dirname, dir);
};

console.log(process.env.NODE_ENV, "sdf");
module.exports = {
  lintOnSave: false,
  // 去除console
  configureWebpack: config => {
    if (process.env.NODE_ENV !== "local") {
      let plugins = [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true, // 注释console
              drop_console: true,
              pure_funcs: ["console.log"] // 移除console
            }
          },
          sourceMap: false,
          parallel: true
        }),
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240,
          minRatio: 0.8,
        })
      ]
      config.plugins.concat(plugins)
    }
    config.entry.vendors = ["vue", "vue-router", "axios", "vuex"]
    config.resolve.alias = {
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
  chainWebpack: config => {
    config.plugins.delete("prefetch");
  }
};
