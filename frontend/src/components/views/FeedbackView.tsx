import {
	Box,
	Container,
	Heading,
	Text,
	VStack,
	Icon,
	SimpleGrid,
} from "@chakra-ui/react";
import { FaCommentAlt, FaEnvelope, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";
import ContactForm from "../ContactForm";

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);
const MotionSimpleGrid = motion.create(SimpleGrid);

export const FeedbackView = () => {
	const { t } = useTranslation("translation", { useSuspense: false });

	return (
		<Container
			maxW="container.xl"
			py={{ base: 8, md: 12 }}
			px={{ base: 4, md: 6 }}
		>
			<MotionVStack
				gap={12}
				align="stretch"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				{/* Header Section */}
				<MotionVStack
					gap={4}
					textAlign="center"
					initial={{ y: -30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<Icon
						as={FaCommentAlt}
						w={16}
						h={16}
						color={colors.orange[500]}
					/>
					<Heading
						as="h1"
						size="2xl"
						color={colors.primaryText}
						fontWeight="bold"
					>
						{t("feedback.title")}
					</Heading>
					<Text
						fontSize="lg"
						maxW="2xl"
						color={colors.primaryText}
						opacity={0.8}
					>
						{t("feedback.subtitle")}
					</Text>
				</MotionVStack>

				{/* Info Cards */}
				<MotionSimpleGrid
					columns={{ base: 1, md: 3 }}
					gap={6}
					mb={8}
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<Box
						bg={colors.egyptian_blue[200]}
						p={6}
						borderRadius="xl"
						textAlign="center"
						border="2px solid"
						borderColor={colors.orange[500]}
						_hover={{
							bg: colors.egyptian_blue[300],
							transform: "translateY(-2px)",
							boxShadow: "0 8px 25px rgba(246, 129, 67, 0.2)",
						}}
						transition="all 0.3s ease"
					>
						<Icon
							as={FaHeart}
							w={10}
							h={10}
							color={colors.orange[500]}
							mb={4}
							className="glow"
						/>
						<Heading size="md" color={colors.primaryText} mb={2}>
							{t("feedback.improvements.title")}
						</Heading>
						<Text color={colors.primaryText} opacity={0.8}>
							{t("feedback.improvements.description")}
						</Text>
					</Box>

					<Box
						bg={colors.indigo[300]}
						p={6}
						borderRadius="xl"
						textAlign="center"
						border="2px solid"
						borderColor={colors.indigo[700]}
						_hover={{
							bg: colors.indigo[400],
							transform: "translateY(-2px)",
							boxShadow: "0 8px 25px rgba(218, 27, 78, 0.2)",
						}}
						transition="all 0.3s ease"
					>
						<Icon
							as={FaCommentAlt}
							w={10}
							h={10}
							color={colors.indigo[700]}
							mb={4}
							className="glow"
						/>
						<Heading size="md" color={colors.primaryText} mb={2}>
							{t("feedback.bugs.title")}
						</Heading>
						<Text color={colors.primaryText} opacity={0.8}>
							{t("feedback.bugs.description")}
						</Text>
					</Box>

					<Box
						bg={colors.fandango[200]}
						p={6}
						borderRadius="xl"
						textAlign="center"
						border="2px solid"
						borderColor={colors.fandango[500]}
						_hover={{
							bg: colors.fandango[300],
							transform: "translateY(-2px)",
							boxShadow: "0 8px 25px rgba(199, 55, 150, 0.2)",
						}}
						transition="all 0.3s ease"
					>
						<Icon
							as={FaEnvelope}
							w={10}
							h={10}
							color={colors.fandango[500]}
							mb={4}
							className="glow"
						/>
						<Heading size="md" color={colors.primaryText} mb={2}>
							{t("feedback.general.title")}
						</Heading>
						<Text color={colors.primaryText} opacity={0.8}>
							{t("feedback.general.description")}
						</Text>
					</Box>
				</MotionSimpleGrid>

				{/* Contact Form Section */}
				<MotionBox
					bg={colors.indigo[200]}
					p={8}
					borderRadius="xl"
					border="2px solid"
					borderColor={colors.magenta[500]}
					boxShadow="0 4px 20px rgba(154, 39, 110, 0.3)"
					_hover={{
						boxShadow: "0 8px 30px rgba(154, 39, 110, 0.4)",
					}}
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					whileHover={{ y: -5 }}
				>
					<VStack gap={6}>
						<Heading
							size="5xl"
							fontWeight="bold"
							color={colors.primaryText}
							textAlign="center"
							className="animated-gradient-text"
						>
							{t("feedback.form.title")}
						</Heading>
						<Text
							color={colors.primaryText}
							opacity={0.9}
							textAlign="center"
							maxW="md"
							fontSize="lg"
						>
							{t("feedback.form.description")}
						</Text>
						<ContactForm />
					</VStack>
				</MotionBox>
			</MotionVStack>
		</Container>
	);
};
