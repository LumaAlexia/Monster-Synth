import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Icon,
	Text,
	VStack,
	HStack,
	Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaArrowRight, FaPlay, FaPause } from "react-icons/fa";
import { GiMonsterGrasp } from "react-icons/gi";
import { motion } from "framer-motion";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);
const MotionButton = motion.create(Button);
const MotionHStack = motion.create(HStack);

interface HomeMainViewProps {
	isPlaying: boolean;
	setIsPlaying: (playing: boolean) => void;
}

export const HomeMainView = ({
	isPlaying,
	setIsPlaying,
}: HomeMainViewProps) => {
	const { t } = useTranslation("translation", { useSuspense: false });

	return (
		<MotionBox
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<Flex align="center" justify="center" minH="100vh" p={8}>
				<Container maxW="container.xl">
					<MotionVStack
						gap={8}
						textAlign="center"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						{/* Monster Icon with Animation */}
						<MotionBox
							className="pulse-slow"
							p={4}
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							<Icon
								as={GiMonsterGrasp}
								w={40}
								h={40}
								color={colors.indigo[900]}
								className="glow-strong"
							/>
						</MotionBox>

						<MotionVStack
							gap={4}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							<Heading
								as="h1"
								fontSize={{
									base: "4xl",
									md: "6xl",
									lg: "7xl",
								}}
								fontWeight="black"
								bgGradient={`linear(to-r, ${colors.orange[400]}, ${colors.blush[400]}, ${colors.fandango[400]})`}
								bgClip="text"
								textAlign="center"
								lineHeight="shorter"
							>
								{t("hero.title")}
							</Heading>

							<Text
								fontSize={{
									base: "lg",
									md: "xl",
									lg: "2xl",
								}}
								maxW="4xl"
								color={colors.primaryText}
								fontWeight="medium"
								opacity={0.9}
							>
								{t("hero.subtitle")}
							</Text>
						</MotionVStack>

						{/* Interactive Play Button */}
						<MotionVStack
							gap={6}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
						>
							<MotionButton
								size="lg"
								bg={`linear-gradient(135deg, ${colors.orange[500]}, ${colors.blush[500]})`}
								color="white"
								_hover={{
									transform: "scale(1.05)",
									boxShadow: `0 0 30px ${colors.orange[500]}50`,
								}}
								_active={{ transform: "scale(0.95)" }}
								onClick={() => setIsPlaying(!isPlaying)}
								borderRadius="full"
								px={8}
								py={6}
								fontSize="lg"
								fontWeight="bold"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{isPlaying ? <FaPause /> : <FaPlay />}
								<Box ml={2}>
									{isPlaying
										? t("hero.pauseDemo")
										: t("hero.playDemo")}
								</Box>
							</MotionButton>

							<MotionHStack
								gap={4}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 1 }}
							>
								<ChakraLink as={NextLink} href="/user/monster">
									<Button
										variant="outline"
										borderColor={colors.orange[500]}
										color={colors.orange[500]}
										_hover={{
											bg: colors.orange[500],
											color: "white",
											transform: "translateY(-2px)",
										}}
										size="lg"
										borderRadius="full"
									>
										{t("hero.createMonster")}
										<Box ml={2}>
											<FaArrowRight />
										</Box>
									</Button>
								</ChakraLink>
							</MotionHStack>
						</MotionVStack>
					</MotionVStack>
				</Container>
			</Flex>

			{/* Animated Audio Bars */}
			<MotionVStack
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 1.2 }}
			>
				<MotionHStack
					pb={8}
					gap={4}
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, delay: 1.4 }}
				>
					{[...Array(7)].map((_, i) => (
						<Box
							key={i}
							width="5px"
							height={
								isPlaying
									? `${20 + Math.random() * 40}px`
									: "20px"
							}
							bg={colors.orange[500]}
							borderRadius="full"
							transition="height 0.1s"
							className={isPlaying ? "pulse-slow" : ""}
						/>
					))}
				</MotionHStack>
			</MotionVStack>
		</MotionBox>
	);
};
