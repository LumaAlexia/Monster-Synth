import {
	Box,
	Button,
	Container,
	Heading,
	Icon,
	Text,
	VStack,
	HStack,
	Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { GiMonsterGrasp } from "react-icons/gi";
import { motion } from "framer-motion";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);
const MotionHStack = motion.create(HStack);

export const HomeCTAView = () => {
	const { t } = useTranslation("translation", { useSuspense: false });

	return (
		<MotionBox
			position="relative"
			zIndex={1}
			bg={`linear-gradient(135deg, ${colors.quinacridone_magenta[900]}, ${colors.indigo[900]})`}
			py={20}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.8 }}
		>
			<Container maxW="container.xl">
				<MotionVStack
					gap={8}
					textAlign="center"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
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

					<MotionHStack
						gap={4}
						flexWrap="wrap"
						justify="center"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.8 }}
					>
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
					</MotionHStack>
				</MotionVStack>
			</Container>
		</MotionBox>
	);
};
