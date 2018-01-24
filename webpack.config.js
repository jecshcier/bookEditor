const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')


const config = {
	entry: {
		main: './dev/index.js',
		vendor: ['react', 'react-dom']
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
					presets: ['react']
				}
			}
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: ['css-loader', 'postcss-loader']
			})
		}]
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
		new ExtractTextPlugin("css/style.css")
		// new UglifyJsPlugin({
		// 	test: /\.js($|\?)/i,
		// 	exclude: /(node_modules|bower_components)/
		// })
	]
};

module.exports = config