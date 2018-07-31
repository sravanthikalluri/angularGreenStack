const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint'
    //   }
    // ],

    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract('style-loader', ['css?minimize!resolve-url!sass?sourceMap', 'postcss-loader'])
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
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {unused: true, dead_code: true} // eslint-disable-line camelcase
    }),
    new SplitByPathPlugin([{
      name: 'vendor',
      path: path.join(__dirname, '../node_modules')
    }]),
    new ExtractTextPlugin('main-[contenthash].css')
  ],
  postcss: () => [autoprefixer],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js'
  },
  externals: ['axios'],
  entry: {
    app: [
      `./${conf.path.src('main.js')}`,
      `./${conf.path.tmp('templateCacheHtml.js')}`
    ]
  }
};
