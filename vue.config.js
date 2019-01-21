const webpack = require('webpack')
const path = require('path')
const resolve  = dir => { return path.join(__dirname, dir) }

module.exports = {
  lintOnSave: false,
  // baseUrl: process.env.NODE_ENV === 'development' ? '/' : '',
  configureWebpack: {
    entry: {
      vendors: [
        'vue',
        'vue-router',
        'axios',
        'vuex'
      ],
      //eleui: [ resolve('src/eleui/index.js') ]
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
      new webpack.ProvidePlugin({
        mapActions: ['vuex', 'mapActions'],
        mapMutations: ['vuex', 'mapMutations'],
        mapGetters: ['vuex', 'mapGetters'],
        mapState: ['vuex', 'mapState'],
      })
    ]
  },
  css: {
    /*loaderOptions: {
      sass: {
        data: `@import "@/variables.scss";`
      }
    }*/
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}