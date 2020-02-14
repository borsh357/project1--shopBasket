var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'development',
  devServer: {
    open: true
  },
  entry: './src/app.js',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: { compact: true },
        exclude: '/node_modules/'
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { sourceMap: true }
        }]
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            publicPath: "/img/"
          }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.min.css',
    }),
    new OptimizeCssAssetsPlugin({}),
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: './src/index.html',
      filename: 'index.html',
      path: path.resolve(__dirname, 'build'),
    }),
    new CopyPlugin([
      { from: './src/img', to: 'img' },
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './src/templates/product-list-tmpl.html',
      filename: 'templates/product-list.html',
      path: path.resolve(__dirname, 'build'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './src/templates/shopping-cart-tmpl.html',
      filename: 'templates/shopping-cart-tmpl.html',
      path: path.resolve(__dirname, 'build'),
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: false,
      template: './src/templates/basket-list-tmpl.html',
      filename: 'templates/basket-list-tmpl.html',
      path: path.resolve(__dirname, 'build'),
    })
  ],
}