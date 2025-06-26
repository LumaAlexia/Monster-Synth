import { Button, Heading, Text, Box, Spinner } from "@chakra-ui/react";
import { ClientSafeProvider, signIn, useSession } from "next-auth/react";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";

interface AuthSignInViewProps {
	providers: Record<string, ClientSafeProvider> | null;
}

export const AuthSignInView = ({ providers }: AuthSignInViewProps) => {
	const { data: session, status } = useSession();
	const { t } = useTranslation("translation", { useSuspense: false });

	if (status === "loading") {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				minHeight="calc(100vh - 100px)"
			>
				<Spinner size="xl" color={colors.orange[500]} />
			</Box>
		);
	}

	if (status === "authenticated" && session) {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				minHeight="calc(100vh - 100px)"
			>
				<Text color={colors.primaryText}>
					{t("signin.alreadyAuthenticated")}
				</Text>
			</Box>
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
			bg={colors.indigo[900]}
			color={colors.primaryText}
		>
			<Heading size={"4xl"} mb={6} color={colors.primaryText}>
				{t("signin.title")}
			</Heading>

			{providers &&
				Object.values(providers).map((provider) => {
					const p = provider as ClientSafeProvider;
					return (
						<Box
							key={p.name}
							mt={4}
							width={{ base: "90%", md: "450px" }}
						>
							<Button
								onClick={() =>
									signIn(p.id, {
										callbackUrl: "/monster",
									})
								}
								width="100%"
								py={3}
								fontSize="md"
								fontWeight="bold"
								borderRadius="md"
								bg={colors.orange[500]}
								color="white"
								_hover={{
									bg: colors.orange[600],
									boxShadow: `0 4px 12px ${colors.orange[500]}40`,
								}}
								_active={{
									bg: colors.orange[700],
								}}
								boxShadow={`0 2px 8px ${colors.orange[500]}20`}
								transition="background-color 0.2s ease, box-shadow 0.2s ease"
							>
								{t("signin.signInWith")} {p.name}
							</Button>
						</Box>
					);
				})}
			{!providers && (
				<Text mt={4} color={colors.blush[500]} textAlign="center">
					{t("signin.noProviders")}
				</Text>
			)}
		</Box>
	);
};
