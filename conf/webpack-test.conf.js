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
        test: /\.js$/,
        exclude: /(node_modules|.*\.spec\.js)/,
        loader: 'isparta'
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
  plugins: [],
  debug: true,
  devtool: 'cheap-module-eval-source-map'
};
