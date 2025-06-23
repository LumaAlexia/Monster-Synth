import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	Text,
	VStack,
	HStack,
	Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
	FaMusic,
	FaReact,
	FaWaveSquare,
	FaArrowRight,
	FaPlay,
	FaPause,
	FaQuestionCircle,
} from "react-icons/fa";
import { GiDna1, GiMonsterGrasp, GiSoundWaves, GiBrain } from "react-icons/gi";
import { MdGraphicEq, MdAudiotrack } from "react-icons/md";
import { FeatureCard } from "../components/FeatureCard";
import { AccordionItem } from "../components/AccordionItem";
import { NextPageWithLayout } from "./_app";
import AppLayout from "@/components/layout/AppLayout";
import { colors } from "../theme/colors";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import nextI18NextConfig from "../../next-i18next.config";
import { WaveSeparator } from "../components/WaveSeparator";
import { HeroWaveSeparator } from "../components/HeroWaveSeparator";

const HomePage: NextPageWithLayout = () => {
	const { t } = useTranslation("common");
	const [isPlaying, setIsPlaying] = useState(false);
	const [openFaq, setOpenFaq] = useState(-1);

	// FAQ Data from translations
	const faqData = [
		{
			question: t("faq.q1.question"),
			answer: [t("faq.q1.answer")],
		},
		{
			question: t("faq.q2.question"),
			answer: [t("faq.q2.answer")],
		},
		{
			question: t("faq.q3.question"),
			answer: [t("faq.q3.answer")],
		},
		{
			question: t("faq.q4.question"),
			answer: [t("faq.q4.answer")],
		},
		{
			question: t("faq.q5.question"),
			answer: [t("faq.q5.answer")],
		},
	];

	return (
		<Box
			bg="linear-gradient(135deg, #4c1d95, #be185d, #f97316)"
			color={colors.primaryText}
			overflow="hidden"
		>
			{/* Animated Background Waves */}
			{/* <Box
				position="fixed"
				top="0"
				left="0"
				right="0"
				bottom="0"
				zIndex={0}
			>
				{[0, 1, 2].map((i) => (
					<Box
						key={i}
						position="absolute"
						top={`${20 + i * 25}%`}
						left="-100%"
						right="-100%"
						height="200px"
						bg={`linear-gradient(90deg, transparent, ${colors.quinacridone_magenta[700]}25, ${colors.blush[600]}20, ${colors.orange[500]}15, ${colors.fandango[600]}20, transparent)`}
						transform={`rotate(${5 - i * 2}deg)`}
						animation={`wave-${i} ${
							8 + i * 2
						}s ease-in-out infinite`}
						css={{
							"@keyframes wave-0": {
								"0%": {
									transform: "translateX(-100%) rotate(5deg)",
								},
								"50%": {
									transform:
										"translateX(100%) rotate(3deg)",
								},
								"100%": {
									transform: "translateX(-100%) rotate(5deg)",
								},
							},
							"@keyframes wave-1": {
								"0%": {
									transform: "translateX(100%) rotate(3deg)",
								},
								"50%": {
									transform: "translateX(-100%) rotate(5deg)",
								},
								"100%": {
									transform: "translateX(100%) rotate(3deg)",
								},
							},
							"@keyframes wave-2": {
								"0%": {
									transform: "translateX(-100%) rotate(1deg)",
								},
								"50%": {
									transform: "translateX(100%) rotate(3deg)",
								},
								"100%": {
									transform: "translateX(-100%) rotate(1deg)",
								},
							},
						}}
					/>
				))}
			</Box> */}

			{/* Hero Section */}
			<Box position="relative" zIndex={1}>
				<Flex
					align="center"
					justify="center"
					minH="100vh"
					position="relative"
					p={8}
				>
					<Container maxW="container.xl">
						<VStack gap={8} textAlign="center">
							{/* Monster Icon with Animation */}
							<Box className="pulse-slow" p={4}>
								<Icon
									as={GiMonsterGrasp}
									w={24}
									h={24}
									color={colors.orange[500]}
									className="glow-strong"
								/>
							</Box>

							<VStack gap={4}>
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
							</VStack>

							{/* Interactive Play Button */}
							<VStack gap={6}>
								<Button
									size="lg"
									bg={`linear-gradient(135deg, ${colors.orange[500]}, ${colors.blush[500]})`}
									color="white"
									_hover={{
										transform: "scale(1.05)",
										boxShadow: `0 0 30px ${colors.orange[500]}50`,
									}}
									_active={{ transform: "scale(0.95)" }}
									transition="all 0.2s"
									onClick={() => setIsPlaying(!isPlaying)}
									borderRadius="full"
									px={8}
									py={6}
									fontSize="lg"
									fontWeight="bold"
								>
									{isPlaying ? <FaPause /> : <FaPlay />}
									<Box ml={2}>
										{isPlaying
											? t("hero.pauseDemo")
											: t("hero.playDemo")}
									</Box>
								</Button>

								<HStack gap={4}>
									<ChakraLink
										as={NextLink}
										href="/user/monster"
									>
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
								</HStack>
							</VStack>
						</VStack>
					</Container>
				</Flex>

				{/* Animated Audio Bars */}
				<Box
					position="absolute"
					bottom={8}
					left="50%"
					transform="translateX(-50%)"
					display="flex"
					gap={2}
					alignItems="end"
				>
					{[...Array(7)].map((_, i) => (
						<Box
							key={i}
							width="4px"
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
				</Box>
			</Box>

			<HeroWaveSeparator />

			{/* Features Section */}
			<Box
				position="relative"
				zIndex={1}
				bg={`linear-gradient(135deg, ${colors.egyptian_blue[900]}, ${colors.indigo[800]}, ${colors.quinacridone_magenta[800]})`}
				py={20}
			>
				<Container maxW="container.xl">
					<VStack gap={16}>
						<VStack gap={4} textAlign="center">
							<Icon
								as={GiBrain}
								w={16}
								h={16}
								color={colors.orange[500]}
							/>
							<Heading
								as="h2"
								size="2xl"
								color={colors.primaryText}
								fontWeight="bold"
							>
								{t("features.title")}
							</Heading>
							<Text
								fontSize="lg"
								maxW="3xl"
								color={colors.primaryText}
								opacity={0.8}
							>
								{t("features.subtitle")}
							</Text>
						</VStack>

						<SimpleGrid
							columns={{ base: 1, md: 2, lg: 3 }}
							gap={8}
							w="full"
						>
							<FeatureCard
								icon={MdAudiotrack}
								title={t("features.spectral.title")}
								text={t("features.spectral.description")}
								gradient={`linear(to-br, ${colors.orange[600]}, ${colors.blush[600]})`}
							/>
							<FeatureCard
								icon={GiSoundWaves}
								title={t("features.procedural.title")}
								text={t("features.procedural.description")}
								gradient={`linear(to-br, ${colors.blush[600]}, ${colors.fandango[600]})`}
							/>
							<FeatureCard
								icon={GiDna1}
								title={t("features.evolution.title")}
								text={t("features.evolution.description")}
								gradient={`linear(to-br, ${colors.fandango[600]}, ${colors.magenta[600]})`}
							/>
							<FeatureCard
								icon={FaWaveSquare}
								title={t("features.visualization.title")}
								text={t("features.visualization.description")}
								gradient={`linear(to-br, ${colors.magenta[600]}, ${colors.quinacridone_magenta[600]})`}
							/>
							<FeatureCard
								icon={MdGraphicEq}
								title={t("features.customization.title")}
								text={t("features.customization.description")}
								gradient={`linear(to-br, ${colors.quinacridone_magenta[600]}, ${colors.indigo[600]})`}
							/>
							<FeatureCard
								icon={FaReact}
								title={t("features.cloud.title")}
								text={t("features.cloud.description")}
								gradient={`linear(to-br, ${colors.indigo[600]}, ${colors.egyptian_blue[600]})`}
							/>
						</SimpleGrid>
					</VStack>
				</Container>
			</Box>

			<WaveSeparator />

			{/* Interactive Demo Section */}
			<Box position="relative" zIndex={1} py={20} bg="#1a1a2e">
				<Container maxW="container.xl">
					<VStack gap={12}>
						<VStack gap={4} textAlign="center">
							<Heading
								as="h2"
								size="2xl"
								color={colors.primaryText}
							>
								{t("demo.title")}
							</Heading>
							<Text
								fontSize="lg"
								maxW="2xl"
								color={colors.primaryText}
								opacity={0.8}
							>
								{t("demo.subtitle")}
							</Text>
						</VStack>

						<SimpleGrid
							columns={{ base: 1, md: 3 }}
							gap={8}
							w="full"
						>
							{[
								{
									step: "01",
									title: t("demo.step1.title"),
									description: t("demo.step1.description"),
									icon: FaMusic,
									color: colors.orange[500],
								},
								{
									step: "02",
									title: t("demo.step2.title"),
									description: t("demo.step2.description"),
									icon: GiBrain,
									color: colors.blush[500],
								},
								{
									step: "03",
									title: t("demo.step3.title"),
									description: t("demo.step3.description"),
									icon: GiMonsterGrasp,
									color: colors.fandango[500],
								},
							].map((item, index) => (
								<Box
									key={index}
									bg="#2a2a4e"
									p={8}
									borderRadius="xl"
									position="relative"
									overflow="hidden"
									_hover={{
										transform: "translateY(-8px)",
										boxShadow: `0 20px 40px ${item.color}20`,
									}}
									transition="all 0.3s"
								>
									<Box
										position="absolute"
										top={0}
										left={0}
										right={0}
										height="4px"
										bg={`linear-gradient(90deg, ${item.color}, ${item.color}80)`}
									/>

									<VStack gap={6} align="start">
										<HStack gap={4}>
											<Box
												bg={`${item.color}20`}
												p={3}
												borderRadius="lg"
												border="2px solid"
												borderColor={item.color}
											>
												<Icon
													as={item.icon}
													w={6}
													h={6}
													color={item.color}
												/>
											</Box>
											<Text
												fontSize="sm"
												fontWeight="bold"
												color={item.color}
												opacity={0.8}
											>
												STEP {item.step}
											</Text>
										</HStack>

										<VStack gap={3} align="start">
											<Heading
												size="lg"
												color={colors.primaryText}
											>
												{item.title}
											</Heading>
											<Text
												color={colors.primaryText}
												opacity={0.7}
											>
												{item.description}
											</Text>
										</VStack>
									</VStack>
								</Box>
							))}
						</SimpleGrid>
					</VStack>
				</Container>
			</Box>

			<WaveSeparator />

			{/* FAQ Section */}
			<Box position="relative" zIndex={1} py={20} bg="#1a1a2e">
				<Container maxW="container.xl">
					<VStack gap={12}>
						<VStack gap={4} textAlign="center">
							<Icon
								as={FaQuestionCircle}
								w={16}
								h={16}
								color={colors.orange[500]}
							/>
							<Heading
								as="h2"
								size="2xl"
								color={colors.primaryText}
								fontWeight="bold"
							>
								{t("faq.title")}
							</Heading>
							<Text
								fontSize="lg"
								maxW="2xl"
								color={colors.primaryText}
								opacity={0.8}
							>
								{t("faq.subtitle")}
							</Text>
						</VStack>

						<Box maxW="4xl" w="full">
							{faqData.map((faq, index) => (
								<AccordionItem
									key={index}
									title={faq.question}
									content={faq.answer}
									isOpen={openFaq === index}
									onToggle={() =>
										setOpenFaq(
											openFaq === index ? -1 : index
										)
									}
									variant="faq"
								/>
							))}
						</Box>
					</VStack>
				</Container>
			</Box>

			{/* Call to Action */}
			<Box
				position="relative"
				zIndex={1}
				bg={`linear-gradient(135deg, ${colors.quinacridone_magenta[900]}, ${colors.indigo[900]})`}
				py={20}
			>
				<Container maxW="container.xl">
					<VStack gap={8} textAlign="center">
						<Icon
							as={GiMonsterGrasp}
							w={20}
							h={20}
							color={colors.orange[500]}
							className="floating-particle"
						/>

						<VStack gap={4}>
							<Heading
								as="h2"
								fontSize={{ base: "3xl", md: "5xl" }}
								fontWeight="black"
								color={colors.primaryText}
							>
								{t("cta.title")}
							</Heading>
							<Text
								fontSize={{ base: "lg", md: "xl" }}
								maxW="2xl"
								color={colors.primaryText}
								opacity={0.8}
							>
								{t("cta.subtitle")}
							</Text>
						</VStack>

						<HStack gap={4} flexWrap="wrap" justify="center">
							<ChakraLink as={NextLink} href="/auth/signin">
								<Button
									size="lg"
									bg={`linear-gradient(135deg, ${colors.orange[500]}, ${colors.blush[500]})`}
									color="white"
									_hover={{
										transform: "scale(1.05)",
										boxShadow: `0 0 40px ${colors.orange[500]}40`,
									}}
									borderRadius="full"
									px={8}
									py={6}
									fontSize="lg"
									fontWeight="bold"
								>
									{t("cta.signupFree")}
									<Box ml={2}>
										<FaArrowRight />
									</Box>
								</Button>
							</ChakraLink>

							<Button
								size="lg"
								variant="outline"
								borderColor={colors.primaryText}
								color={colors.primaryText}
								_hover={{
									bg: colors.primaryText,
									color: colors.indigo[900],
								}}
								borderRadius="full"
								px={8}
								py={6}
								fontSize="lg"
							>
								{t("cta.learnMore")}
							</Button>
						</HStack>
					</VStack>
				</Container>
			</Box>
		</Box>
	);
};

HomePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(
				locale || "en",
				["common"],
				nextI18NextConfig
			)),
		},
	};
};

export default HomePage;
