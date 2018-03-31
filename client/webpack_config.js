const path = require('path'),
      webpack = require("webpack"),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve('./src'),
  watch: true,
  devtool: 'source-map',
  devServer: {
    host       : '0.0.0.0',
    port       : 8080,
    contentBase: 'dist/',
    quiet      : false,
    stats      : {
        colors: true
    },
    watchOptions: {
      poll: 1000
    }
  },
  entry: {
    'arithmetic-solver': path.resolve('./src/init.js')
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    libraryTarget: "var",
    library: 'ArithmeticSolver'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /(node_modules|coverage)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('./src/index.html'),
      title: 'Math with Friends!',
      firebaseApiKey: 'AIzaSyAkTOrNOT7sEbQEQUW-amj7g30XOvfJ4to',
      firebaseId: 'dannydavidson-11235'
    })
  ],
  resolve: {
    extensions: [
      '.js'
    ],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ]
  },
};
