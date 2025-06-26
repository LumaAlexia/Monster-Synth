import {
	Button,
	Heading,
	Text,
	Box,
	VStack,
	Spinner,
	Center,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";

export const AuthSignOutView = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const { t } = useTranslation("translation", { useSuspense: false });

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/" });
	};

	if (status === "loading") {
		return (
			<Center minH="calc(100vh - 100px)">
				<Spinner size="xl" color={colors.orange[500]} />
			</Center>
		);
	}

	if (status === "unauthenticated" || !session) {
		return (
			<Center minH="calc(100vh - 100px)">
				<Text color={colors.primaryText}>
					{t("signout.redirecting")}
				</Text>
			</Center>
		);
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			minHeight="calc(100vh - 100px)"
			px="20px"
			py={10}
			bg={colors.blush[500]}
			color={colors.primaryText}
		>
			<Heading
				size={"2xl"}
				mb={6}
				color={colors.orange[500]}
				textAlign="center"
			>
				{t("signout.title")}
			</Heading>
			<Text mb={8} color={colors.primaryText} textAlign="center">
				{t("signout.description")}
			</Text>
			<VStack gap={4} width={{ base: "90%", md: "450px" }}>
				<Button
					onClick={handleSignOut}
					bg={colors.blush[500]}
					color={colors.primaryText}
					width="100%"
					py={6}
					fontSize="lg"
					_hover={{
						bg: colors.blush[600],
					}}
					_active={{
						bg: colors.blush[700],
					}}
				>
					{t("signout.confirm")}
				</Button>
				<Button
					onClick={() => router.push("/home")}
					variant="outline"
					borderColor={colors.orange[500]}
					color={colors.orange[500]}
					width="100%"
					py={6}
					fontSize="lg"
					_hover={{
						bg: `${colors.orange[500]}20`,
					}}
				>
					{t("signout.cancel")}
				</Button>
			</VStack>
		</Box>
	);
};
