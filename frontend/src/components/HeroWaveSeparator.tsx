import { Box } from "@chakra-ui/react";

export const HeroWaveSeparator = () => {
	return (
		<Box>
			<svg
				viewBox="0 0 1920 1080"
				width="100%"
				height="100px"
				preserveAspectRatio="none"
			>
				<defs>
					<linearGradient
						id="wave-gradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop offset="0%" stopColor="#4c1d95" />
						<stop offset="50%" stopColor="#be185d" />
						<stop offset="100%" stopColor="#f97316" />
					</linearGradient>
				</defs>
				<path
					d="M0 199L35.5 203.8C71 208.7 142 218.3 213.2 230C284.3 241.7 355.7 255.3 426.8 245.5C498 235.7 569 202.3 640 176.2C711 150 782 131 853.2 114.3C924.3 97.7 995.7 83.3 1066.8 109.3C1138 135.3 1209 201.7 1280 226.3C1351 251 1422 234 1493.2 219.3C1564.3 204.7 1635.7 192.3 1706.8 171.5C1778 150.7 1849 121.3 1884.5 106.7L1920 92L1920 0L1884.5 0C1849 0 1778 0 1706.8 0C1635.7 0 1564.3 0 1493.2 0C1422 0 1351 0 1280 0C1209 0 1138 0 1066.8 0C995.7 0 924.3 0 853.2 0C782 0 711 0 640 0C569 0 498 0 426.8 0C355.7 0 284.3 0 213.2 0C142 0 71 0 35.5 0L0 0Z"
					fill="url(#wave-gradient)"
				/>
			</svg>
		</Box>
	);
};
