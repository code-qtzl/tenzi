const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		watchFiles: ['src/**/*'],
		// port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.jsx', '.ts', '.js', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
