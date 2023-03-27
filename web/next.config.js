const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

module.exports = withPWA({
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://khaichuen.pythonanywhere.com/:path*"
			}
		]
	},
	pwa: {
		dest: "public",
		runtimeCaching,
		disable: process.env.NODE_ENV === "development"
	},
})
