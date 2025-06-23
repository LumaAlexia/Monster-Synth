const nextI18NextConfig = {
	i18n: {
		defaultLocale: "en",
		locales: ["en", "it", "de"],
	},
	fallbackLng: "en",
	debug: process.env.NODE_ENV === "development",
	reloadOnPrerender: process.env.NODE_ENV === "development",
	serializeConfig: false,
	use: [],
};

export default nextI18NextConfig;
