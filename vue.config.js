const webpack = require('webpack')
const path = require('path')
const resolve  = dir => { return path.join(__dirname, dir) }

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: {
      vendors: [
        'vue',
        'vue-router',
        'axios',
        'vuex'
      ],
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        'IMAGES': resolve('src/assets/images'),
        'UTIL': resolve('src/util'),
        'API' : resolve('src/api'),
        'STORE' : resolve('src/store'),
        'COMPONENTS' : resolve('src/components'),
        'CONFIGS' : resolve('src/configs'),
        'STYLES' : resolve('src/styles'),
        'ICONFONT' : resolve('src/assets/iconfont'),
        'FILTERS' : resolve('src/filters'),
        'COLORS' : resolve('src/eleui/colors')
      }
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress:{
          drop_console:true
        }
      }),
      new webpack.ProvidePlugin({
        mapActions: ['vuex', 'mapActions'],
        mapMutations: ['vuex', 'mapMutations'],
        mapGetters: ['vuex', 'mapGetters'],
        mapState: ['vuex', 'mapState'],
      })
    ]
  },
  css: {},
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}