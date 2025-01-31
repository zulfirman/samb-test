/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/login",
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "20.89.250.113",
				port: "5300",
				pathname: "/main/static/upload/**",
			},
		],
	},
};

module.exports = nextConfig;
