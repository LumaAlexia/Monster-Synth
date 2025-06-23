import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const WaveSeparator = () => {
	return (
		<MotionBox
			height="100px"
			width="100%"
			overflow="hidden"
			position="relative"
		>
			<MotionBox
				position="absolute"
				top="-100px"
				left="0"
				width="100%"
				height="100px"
				bg="linear-gradient(to right, #4c1d95, #be185d, #f97316)"
				animate={{
					translateY: [0, 10, 0],
				}}
				transition={{
					duration: 5,
					ease: "easeInOut",
					repeat: Infinity,
				}}
			/>
		</MotionBox>
	);
};
