import {
	getProviders,
	signIn,
	ClientSafeProvider,
	useSession,
} from "next-auth/react";
import type { GetServerSidePropsContext } from "next";
import AppLayout from "@/components/layout/AppLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Button, Heading, Text, Box, Spinner } from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../../next-i18next.config";

interface SignInPageProps {
	providers: Record<string, ClientSafeProvider> | null;
}

const SignInPage = ({ providers }: SignInPageProps) => {
	const { data: session, status } = useSession();
	const { t } = useTranslation("common");

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

SignInPage.getLayout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (session) {
		return {
			redirect: {
				destination: "/home",
				permanent: false,
			},
		};
	}

	const providers = await getProviders();

	return {
		props: {
			providers: providers ?? null,
			...(await serverSideTranslations(
				context.locale || "en",
				["common"],
				nextI18NextConfig
			)),
		},
	};
}

export default SignInPage;
