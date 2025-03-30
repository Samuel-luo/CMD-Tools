import path from "path";
import nodeExternals from "webpack-node-externals";
import { Configuration } from "webpack";

const config: Configuration = {
	entry: { main: "./src/index.ts", cli: "./src/cli.ts" },
	target: "node",
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [{ loader: "ts-loader" }, { loader: "shebang-loader" }],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
};

export default config;
