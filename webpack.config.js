const webpack = require("webpack");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
	// devtool: 'eval-source-map',
	entry: __dirname + '/app/index.js',
	output: {
		path: __dirname + '/dist',
		filename: "bundle.js"	
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'css-loader'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: './public', //本地服务器加载的页面的所在目录
		historyApiFallback: true,
		inline: true, //实时刷新
		hot: true, // 热更新
		port: 8080 //默认端口，也可以不写
	}
}