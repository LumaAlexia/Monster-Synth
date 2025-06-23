import {
	getProviders,
	signIn,
	ClientSafeProvider,
	useSession,
} from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { getServerSession, AuthOptions } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Button, Heading, Text, Box, Spinner } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import React from "react";

type SignInPageLayout = NextPageWithLayout & {
	providers: Record<string, ClientSafeProvider> | null;
};

const SignInPage: SignInPageLayout = ({ providers }) => {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return (
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				minHeight="calc(100vh - 100px)"
			>
				<Spinner size="xl" color={colors.xanthous.DEFAULT} />
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
					Sei già autenticato. Verrai reindirizzato alla tua home
					page...
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
			bg={colors.dark_purple.DEFAULT}
			color={colors.primaryText}
		>
			<Heading size={"4xl"} mb={6} color={colors.primaryText}>
				Accedi al tuo Account
			</Heading>

			{providers &&
				Object.values(providers).map((provider: any) => (
					<Box
						key={provider.name}
						mt={4}
						width={{ base: "90%", md: "450px" }}
					>
						<Button
							onClick={() =>
								signIn(provider.id, {
									callbackUrl: "/lobby",
								})
							}
							width="100%"
							py={3}
							fontSize="md"
							fontWeight="bold"
							borderRadius="md"
							bg={colors.bright_dino_green.DEFAULT}
							color={colors.dark_purple.DEFAULT}
							_hover={{
								bg: colors.xanthous[500],
								boxShadow: `0 4px 12px ${colors.walnut_brown.DEFAULT}40`,
							}}
							_active={{
								bg: colors.xanthous[700],
							}}
							boxShadow={`0 2px 8px ${colors.xanthous.DEFAULT}20`}
							transition="background-color 0.2s ease, box-shadow 0.2s ease"
						>
							Accedi con {provider.name}
						</Button>
					</Box>
				))}
			{!providers && (
				<Text
					mt={4}
					color={colors.bittersweet.DEFAULT}
					textAlign="center"
				>
					Nessun provider di autenticazione OAuth configurato.
				</Text>
			)}
		</Box>
	);
};

SignInPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<{ props: SignInPageProps }> {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions as AuthOptions
	);

	if (session) {
		return {
			redirect: {
				destination: "/home",
				permanent: false,
			},
		} as any;
	}

	const providers = await getProviders();

	return {
		props: { providers: providers ?? null },
	};
}

export default SignInPage;
