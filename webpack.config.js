const path = require('path');
// const toml = require('toml');
// const yaml = require('yamljs');
// const json5 = require('json5');
var webpack = require('webpack');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  // Set entry points for the app
  entry: 
  // ['webpack-hot-middleware/client', './src/index.js'],
  {
    app: './src/index.js',
    // print: './src/print.js',
    // index: ['webpack-hot-middleware/client', './src/index.js'],
    // print: ['webpack-hot-middleware/client', './src/print.js'],
  },
  // Creates a source map, linking errors in the bundled file to the place in the unbundled files
  devtool: 'inline-source-map',
  // Tells web server to look here
  devServer: {
    contentBase: './dist',
    // Enables hot reloading with webpack-dev-server
    hot: true,
  },
  plugins: [
    // Recreates files in /dist folder, except index.html
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // 
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
    // Enables hot reloading with webpack-dev-middleware

    // OccurrenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // Used to make sure files are served correctly on the local host
    publicPath: '/',
  },
  module: {
    rules: [
      // Load CSS
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // // Load images
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      // },
      // // Load fonts 
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource',
      // },
      // // Load CSV
      // {
      //   test: /\.(csv|tsv)$/i,
      //   use: ['csv-loader'],
      // },
      // // Load XML
      // {
      //   test: /\.xml$/i,
      //   use: ['xml-loader'],
      // },
      // // Load toml
      // {
      //   test: /\.toml$/i,
      //   type: 'json',
      //   parser: {
      //     parse: toml.parse,
      //   },
      // },
      // // Load yaml
      // {
      //   test: /\.yaml$/i,
      //   type: 'json',
      //   parser: {
      //     parse: yaml.parse,
      //   },
      // },
      // // Load json5
      // {
      //   test: /\.json5$/i,
      //   type: 'json',
      //   parser: {
      //     parse: json5.parse,
      //   },
      // },
    ],
  },
};