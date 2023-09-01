const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
		clean: true,
		assetModuleFilename: "assets/[name][ext]",
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// fallback to style-loader in development
					process.env.NODE_ENV !== "production"
						? "style-loader"
						: MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: true,
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(jpg|png|gif|ico)$/,
				type: "asset/resource",
				generator: {
					filename: "assets/images/[name][ext]",
				},
			},
			{
				test: /\.svg/,
				type: "asset/resource",
				generator: {
					filename: "assets/svg/[name][ext]",
				},
			},
			{
				test: /\.mp4/,
				type: "asset/resource",
				generator: {
					filename: "assets/videos/[name][ext]",
				},
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts/",
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html",
			filename: "index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
	devServer: {
		port: 3000,
		hot: false,
		liveReload: true,
	},
	mode: "production",
}
