import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	i18n: {
		defaultLocale: "en",
		locales: ["en", "it", "de", "es"],
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
