const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";
const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../skalla_server/public'),
  devServer: {
  proxy: {
    '/api/**': {
      target: 'http://localhost:8081',
      secure: false,
      changeOrigin: true,
  },
  publicPath:'/'
},
env: {
  apiBaseUrl:'https://skalla256.herokuapp.com'
},
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'Vue Argon Dashboard',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
