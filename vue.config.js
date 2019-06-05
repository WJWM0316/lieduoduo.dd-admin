const webpack = require("webpack");
const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

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
    // optimization: {
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       uglifyOptions: {
    //         compress: {
    //           drop_debugger: true, // console
    //           drop_console: true,
    //           pure_funcs: ["console.log"] // 移除console
    //         }
    //       },
    //       sourceMap: false,
    //       parallel: true
    //     })
    //   ]
    // },
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true, //consoledrop_debugger:false,
            pure_funcs: ["console.log"] //移除console
          }
        }
      }),
      new webpack.ProvidePlugin({
        mapActions: ["vuex", "mapActions"],
        mapMutations: ["vuex", "mapMutations"],
        mapGetters: ["vuex", "mapGetters"],
        mapState: ["vuex", "mapState"]
      })
    ]
  },
  css: {},
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    // if (process.env.NODE_ENV === "production") {
    //   console.log("--------");
    //   console.log(config);
    //   console.log("----1-------");
    //   console.log(config.optimization.minimizer);
    //   // [0].options.terserOptions.compress.drop_console = true
    // }
    // config.plugins.push(

    // )
  }
};
