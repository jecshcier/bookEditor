const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const config = {
  entry: {
    main: './dev/index.js',
    vendor: ['react', 'react-dom', 'antd']
  },
  output: {
    filename: 'js/[name].js',
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react','env']
        },
      }
    }, {
      test: /\.css$/,
      // exclude: /node_modules/,
      // include: path.resolve(__dirname, 'node_modules/antd/'),
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        },
        {
          loader: 'postcss-loader'
        }
      ]
    }
    
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "js/lib/vender.bundle.js"
    }),
    new HtmlWebpackPlugin({
      title: '数字教材编辑器V1.0',
      filename: 'index.html',
      template: path.join(__dirname, 'dev/templates/index.html')
    })
  ]
};

module.exports = config