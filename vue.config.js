module.exports = {
	configureWebpack: {
		devtool: 'source-map',
	},
	devServer: {
		proxy: 'http://127.0.0.1:8000/api',
	},
}
