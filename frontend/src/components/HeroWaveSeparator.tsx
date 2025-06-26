import { Box } from "@chakra-ui/react";
import Wave from "react-wavify";

export const HeroWaveSeparator = ({ inverted }: { inverted: boolean }) => {
	return (
		<Box
			style={{
				display: "flex",
				transform: inverted ? "scaleY(-1)" : "scaleY(1)",
			}}
		>
			<Wave
				fill="url(#gradient)"
				options={{
					height: 60,
					amplitude: 25,
					speed: 0.2,
					points: 6,
				}}
			>
				<defs>
					<linearGradient id="gradient">
						<stop offset="0%" stopColor="#4c1d95" />
						<stop offset="50%" stopColor="#a90e4fff" />
						<stop offset="100%" stopColor="#c06524ff" />
					</linearGradient>
				</defs>
			</Wave>
		</Box>
	);
};
