import { Box } from "@chakra-ui/react";
import { colors } from "../theme/colors";

interface AnimatedBackgroundProps {
	variant?: "waves" | "particles" | "cosmic";
	intensity?: "low" | "medium" | "high";
}

export const AnimatedBackground = ({
	variant = "waves",
	intensity = "medium",
}: AnimatedBackgroundProps) => {
	const particleCount =
		intensity === "low" ? 15 : intensity === "medium" ? 25 : 40;
	const waveCount = intensity === "low" ? 3 : intensity === "medium" ? 5 : 8;

	if (variant === "particles") {
		return (
			<Box
				position="fixed"
				top="0"
				left="0"
				right="0"
				bottom="0"
				zIndex={0}
				overflow="hidden"
			>
				{[...Array(particleCount)].map((_, i) => (
					<Box
						key={i}
						position="absolute"
						width={`${2 + Math.random() * 4}px`}
						height={`${2 + Math.random() * 4}px`}
						bg={
							Math.random() > 0.5
								? colors.orange[500]
								: colors.blush[500]
						}
						borderRadius="full"
						top={`${Math.random() * 100}%`}
						left={`${Math.random() * 100}%`}
						className="floating-particle"
						opacity={0.4 + Math.random() * 0.4}
					/>
				))}
			</Box>
		);
	}

	if (variant === "cosmic") {
		return (
			<Box
				position="fixed"
				top="0"
				left="0"
				right="0"
				bottom="0"
				zIndex={0}
				overflow="hidden"
			>
				{/* Cosmic background with moving gradients */}
				<Box
					position="absolute"
					top="-50%"
					left="-50%"
					right="-50%"
					bottom="-50%"
					bg={`radial-gradient(circle at 20% 20%, ${colors.quinacridone_magenta[900]}40 0%, transparent 50%),
               radial-gradient(circle at 80% 80%, ${colors.indigo[900]}30 0%, transparent 50%),
               radial-gradient(circle at 40% 60%, ${colors.egyptian_blue[800]}20 0%, transparent 50%)`}
					className="wave"
				/>

				{/* Floating orbs */}
				{[...Array(8)].map((_, i) => (
					<Box
						key={i}
						position="absolute"
						width={`${20 + Math.random() * 40}px`}
						height={`${20 + Math.random() * 40}px`}
						bg={`radial-gradient(circle, ${colors.orange[500]}20, transparent 70%)`}
						borderRadius="full"
						top={`${Math.random() * 100}%`}
						left={`${Math.random() * 100}%`}
						className="pulse-slow"
						filter="blur(1px)"
					/>
				))}
			</Box>
		);
	}

	// Default waves variant
	return (
		<Box
			position="fixed"
			top="0"
			left="0"
			right="0"
			bottom="0"
			zIndex={0}
			overflow="hidden"
		>
			{[...Array(waveCount)].map((_, i) => (
				<Box
					key={i}
					position="absolute"
					top={`${15 + i * (70 / waveCount)}%`}
					left="-100%"
					right="-100%"
					height={`${60 + Math.random() * 40}px`}
					bg={`linear-gradient(90deg, 
               transparent, 
               ${
					i % 2 === 0
						? colors.quinacridone_magenta[800]
						: colors.blush[700]
				}${
						intensity === "low"
							? "15"
							: intensity === "medium"
							? "25"
							: "35"
					}, 
               ${i % 3 === 0 ? colors.orange[600] : colors.fandango[600]}${
						intensity === "low"
							? "10"
							: intensity === "medium"
							? "20"
							: "30"
					}, 
               transparent)`}
					transform={`rotate(${3 - i * 1.5}deg)`}
					className="wave"
					filter="blur(1px)"
					style={{
						animationDelay: `${i * 1.5}s`,
						animationDuration: `${12 + i * 3}s`,
					}}
				/>
			))}

			{/* Additional layer for depth */}
			{intensity !== "low" && (
				<Box
					position="absolute"
					top="0"
					left="0"
					right="0"
					bottom="0"
					bg={`radial-gradient(ellipse at center, transparent 0%, ${colors.indigo[900]}10 70%, ${colors.egyptian_blue[900]}20 100%)`}
					className="pulse-slow"
				/>
			)}
		</Box>
	);
};
