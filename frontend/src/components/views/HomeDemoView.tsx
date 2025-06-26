import {
	Box,
	Container,
	Heading,
	Icon,
	SimpleGrid,
	Text,
	VStack,
	HStack,
} from "@chakra-ui/react";
import { FaMusic } from "react-icons/fa";
import { GiBrain, GiMonsterGrasp } from "react-icons/gi";
import { motion } from "framer-motion";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);
const MotionSimpleGrid = motion.create(SimpleGrid);

export const HomeDemoView = () => {
	const { t } = useTranslation("translation", { useSuspense: false });

	const demoSteps = [
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
	];

	return (
		<MotionBox
			py={20}
			bg={colors.infoCard}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<Container maxW="container.xl">
				<MotionVStack
					gap={12}
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
						<Heading as="h2" size="2xl" color={colors.primaryText}>
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
					</MotionVStack>

					<MotionSimpleGrid
						columns={{ base: 1, md: 3 }}
						gap={8}
						w="full"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						{demoSteps.map((item, index) => (
							<Box
								key={index}
								bg={colors.featureCard}
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
					</MotionSimpleGrid>
				</MotionVStack>
			</Container>
		</MotionBox>
	);
};
