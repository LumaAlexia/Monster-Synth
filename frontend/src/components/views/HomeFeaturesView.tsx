import {
	Box,
	Container,
	Heading,
	Icon,
	SimpleGrid,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FaReact, FaWaveSquare } from "react-icons/fa";
import { GiDna1, GiSoundWaves, GiBrain } from "react-icons/gi";
import { MdGraphicEq, MdAudiotrack } from "react-icons/md";
import { motion } from "framer-motion";
import { FeatureCard } from "../FeatureCard";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";
import { HeroWaveSeparator } from "../HeroWaveSeparator";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);
const MotionSimpleGrid = motion.create(SimpleGrid);

export const HomeFeaturesView = () => {
	const { t } = useTranslation("translation", { useSuspense: false });

	return (
		<MotionBox
			id="features"
			bg={`linear-gradient(135deg, ${colors.egyptian_blue[900]}, ${colors.indigo[800]}, ${colors.quinacridone_magenta[800]})`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<HeroWaveSeparator inverted={true} />
			<Container maxW="container.xl" py={"3rem"}>
				<MotionVStack
					gap={16}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<MotionVStack
						gap={4}
						textAlign="center"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
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
					</MotionVStack>

					<MotionSimpleGrid
						columns={{ base: 1, md: 2, lg: 3 }}
						gap={8}
						w="full"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
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
					</MotionSimpleGrid>
				</MotionVStack>
			</Container>
			<HeroWaveSeparator inverted={false} />
		</MotionBox>
	);
};
