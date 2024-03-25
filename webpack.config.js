const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    proxy: [
      {
        context: () => true,
        target: 'https://apicert.sii.cl',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    ],
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    watchFiles: ['./src/*'],
  },
  plugins: [
    new FaviconsWebpackPlugin('src/images/favicon.png'),
    new HtmlWebpackPlugin({
      title: 'API',
      filename: 'index.html',
      template: 'src/indexTemplate.html',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
