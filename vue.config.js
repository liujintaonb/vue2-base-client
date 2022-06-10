const path = require('path')
// const Mocks = require('./mock.config');
const resolve = dir => path.join(__dirname, dir)
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|svg)(\?.*)?$/i
const titleName = process.env.VUE_APP_TITLE

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',
  outputDir: process.env.VUE_APP_FILENAME || 'dist',
  chainWebpack: config => {
    config.plugins.delete('prefetch-index')
    config.plugins.delete('preload-index')
    config.module.rule('eslint')
    // 添加别名
    config.resolve.alias.set('@', resolve('src'))

    if (process.env.NODE_ENV !== 'development') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        }))
    }

    config.module // webpackChain 提供的添加 loader 方法
      .rule('docx')
      .test(/\.docx$/)
      .use('docx-loader')
      .loader('docx-loader')
      .tap(options => {
        return {
          removeLinks: true
        }
      })
      .end()
  },
  configureWebpack: (config) => {
    config.name = titleName
    if (process.env.NODE_ENV !== 'development') { // 为生产环境修改配置
      config.performance = {
        // 警告 webpack 的性能提示
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 50000000,
        // 生成文件的最大体积
        maxAssetSize: 30000000
      }
    }
  },
  devServer: {
    port: 8035,
    disableHostCheck: true
  }
}
