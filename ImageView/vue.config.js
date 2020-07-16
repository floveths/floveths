const webpack = require('webpack')

module.exports = {
  productionSourceMap : false,
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery",
          "windows.jQuery":"jquery"
        })
      ]
  },
  publicPath: process.env.NODE_ENV === 'production'? './': '/',
  devServer : {
      port : 8090
  }
}