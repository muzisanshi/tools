
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode:'production',
  entry: {
		index:'./src/index.js'
	},
  output: {
    filename: 'tools.js',
    path: path.resolve(__dirname, 'dist')
  },
	module:{
		rules:[
			{
				test: /\.scss$/,
				use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
			},
			{
				test: /\.less$/,
				use: ExtractTextWebpackPlugin.extract({
			    fallback: 'style-loader',
			    use: ['css-loader', 'less-loader']
			  })
			},
			{
				test: /\.(gif|jpg|png|svg)/, 
				use:[
					{
						loader:'url-loader',
						options:{
							limit:8192,
							outputPath:'images/'
						}
					}
				],
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)$/,
				use: [
					{
						loader:'url-loader'
					}
				]
			},
			{
				test: /\.(html)$/, 
				use:[
					{
						loader: 'html-loader',
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env','stage-0','stage-1','stage-2','stage-3'],
						plugins: ['transform-runtime']
					}
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
		    title:"tools",
		    chunks:['index'],
		    filename:'index.html',
		    template:'src/html/demo1.html',
		    inject:"body",
		}),
		new ExtractTextWebpackPlugin('app.css'),
		new webpack.NamedModulesPlugin(),// 模块热更新
		new webpack.HotModuleReplacementPlugin(),// 模块热更新
	],
	devServer:{
		contentBase: path.resolve(__dirname, 'dist'),
		hot: true,
	}
}