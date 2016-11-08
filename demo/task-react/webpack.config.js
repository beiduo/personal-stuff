var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index'
  ],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css',
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.svg$/,
        loader: 'babel?presets[]=es2015,presets[]=react!svg-react',
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
