import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	i18n: {
		defaultLocale: "en",
		locales: ["en", "it", "de"],
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
