var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./app/index.js",
	output: {
		path: __dirname + "/public",
		publicPath: "/",
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "postcss-loader"
					},
					{
						loader: "sass-loader"
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			"jQuery": "jquery",
			"$": "jquery",
			"global.jQuery": "jquery",
			"_": "lodash"
		}),
		new HtmlWebpackPlugin({
            template: "./app/index.html"
        }),
		new CopyWebpackPlugin([
            {
				from: "./app/img",
				to: "./img"
			}
        ])
	]
};