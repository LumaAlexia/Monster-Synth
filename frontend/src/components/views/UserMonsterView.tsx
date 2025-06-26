import {
	Box,
	Button,
	Container,
	Heading,
	Text,
	VStack,
	Image,
	Avatar,
	HStack,
	Card,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { colors } from "../../theme/colors";

const MotionBox = motion.create(Box);

export const UserMonsterView = () => {
	const { data: session, status } = useSession();
	const { t } = useTranslation("translation", { useSuspense: false });

	return (
		<Container
			maxW="container.xl"
			py={{ base: 8, md: 12 }}
			px={{ base: 4, md: 6 }}
			textAlign="center"
		>
			<VStack gap={8}>
				{status === "loading" ? (
					<Box>{t("common.loading")}</Box>
				) : status === "unauthenticated" ? (
					<>
						<Heading as="h1" size="4xl" color="primary">
							{t("monster.welcomeTitle")}
						</Heading>
						<Text fontSize="xl" maxW="2xl" mx="auto">
							{t("monster.welcomeSubtitle")}
						</Text>
						<NextLink href="/auth/signin" passHref>
							<Button
								as="a"
								bg="primary"
								size="lg"
								_hover={{ bg: "indigo.600" }}
							>
								{t("monster.startCreating")}
							</Button>
						</NextLink>
						<Image
							src="/assets/banner.png"
							alt="Monster Synth Banner"
						/>
					</>
				) : (
					<MotionBox
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<VStack gap={6}>
							<HStack gap={4} alignItems="center">
								<Avatar.Root size="2xl">
									<Avatar.Image
										src={session!.user!.image || undefined}
									/>
									<Avatar.Fallback
										bg={colors.egyptian_blue[500]}
										color="white"
										fontSize="2xl"
									>
										{session!.user!.name?.charAt(0) || "U"}
									</Avatar.Fallback>
								</Avatar.Root>
								<VStack gap={2} alignItems="flex-start">
									<Heading
										as="h1"
										size="2xl"
										color={colors.primaryText}
									>
										{t("monster.welcomeBackUser", {
											name: session!.user!.name,
										})}
									</Heading>
									<Text fontSize="lg" color="whiteAlpha.800">
										{t("monster.readyToCreate")}
									</Text>
								</VStack>
							</HStack>

							<Card.Root
								bg={colors.egyptian_blue[200]}
								borderColor={colors.egyptian_blue[400]}
								borderWidth="1px"
								p={6}
								rounded="xl"
								maxW="lg"
							>
								<Card.Body textAlign="center">
									<VStack gap={4}>
										<Text color={colors.primaryText}>
											{t("monster.dashboardDescription")}
										</Text>
										<NextLink href="/dashboard" passHref>
											<Button
												as="a"
												bg={colors.orange[500]}
												color="white"
												size="lg"
												_hover={{
													bg: colors.orange[600],
													transform:
														"translateY(-2px)",
												}}
												_active={{
													bg: colors.orange[700],
													transform:
														"translateY(0px)",
												}}
												transition="all 0.2s"
											>
												{t("monster.goToDashboard")}
											</Button>
										</NextLink>
									</VStack>
								</Card.Body>
							</Card.Root>
						</VStack>
					</MotionBox>
				)}
			</VStack>
		</Container>
	);
};
