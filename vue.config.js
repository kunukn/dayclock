const webpack = require('webpack')
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
const path = require('path')

module.exports = {
  configureWebpack: (config) => {
    config.devtool = 'source-map'
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': { PACKAGE_VERSION: `"${version}"` },
      })
    )
    config.resolve.alias['~'] = path.resolve(__dirname, '')

    config.optimization = {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000,
      },
    }
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/app-styles/_variables.scss";
          @import "@/app-styles/_breakpoints.scss";
          `,
      },
    },
  },
}
