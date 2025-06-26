import { getProviders, ClientSafeProvider } from "next-auth/react";
import AppLayout from "@/components/layout/AppLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import React from "react";
import { AuthSignInView } from "@/components/views";
import type { GetServerSidePropsContext } from "next";

interface SignInPageProps {
	providers: Record<string, ClientSafeProvider> | null;
}

const SignInPage = ({ providers }: SignInPageProps) => {
	return <AuthSignInView providers={providers} />;
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
		},
	};
}

export default SignInPage;
