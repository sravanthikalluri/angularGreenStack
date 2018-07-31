const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'resolve-url',
          'sass?sourceMap',
          'postcss'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'ng-annotate'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|eps)$/,
        include: [ conf.path.src('assets/images') ],
        loader: [
          'file-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: [
          'html-loader'
        ]
      }
    ]
  },
  sassLoader: {
  	includePaths: ['src/styles']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
      inject: true
    })
  ],
  postcss: () => [autoprefixer],
  debug: true,
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'main.js'
  },
  externals: ['axios'],
  entry: `./${conf.path.src('main.js')}`
};
