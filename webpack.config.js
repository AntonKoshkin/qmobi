const path						= require('path');
const webpack					= require('webpack');
const HtmlWebpackPlugin		= require('html-webpack-plugin');
const CleanWebpackPlugin	= require('clean-webpack-plugin');

module.exports = {
	entry : './src/app',
	output: {
		path      : path.join(__dirname, 'dist'),
		filename  : 'bundle.js',
		publicPath: '/',
	},

	devtool: 'cheap-module-eval-source-map',

	module: {
		rules: [
			{
				test   : /\.js$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader : 'eslint-loader',
			}, {
				test   : /\.js$/,
				exclude: /node_modules/,
				loader : 'babel-loader',
			}, {
				test   : /\.styl$/,
				exclude: /node_modules/,
				use    : [
					'style-loader',
					'css-loader',
					{
						loader : 'postcss-loader',
						options: {sourceMap: 'inline'},
					},
					'stylus-loader'
				],
			}, {
				test   : /\.pug/,
				exclude: /node_modules/,
				use    : [
					{
						loader : 'pug-loader',
						options: {pretty: true},
					}
				],
			}
		],
	},

	resolve: {
		extensions: [
			'.js',
			'.html',
			'.css',
			'.styl'
		],
	},

	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.pug',
			path    : 'dist',
		})
	],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress   : true,
		port       : 7777,
		overlay    : {errors: true},

		watchContentBase  : true,
		historyApiFallback: true,
	},
};
