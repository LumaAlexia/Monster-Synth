import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactNode } from "react";
import Head from "next/head";

import "@/theme/globals.css";
import { system } from "@/theme"; // Importa 'system' dal tema personalizzato V3
import { Session } from "next-auth";
import ClickSpark from "@/components/ClickSpark";

export type NextPageWithLayout = NextPage & {
	getLayout?: (children: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	session: Session;
	Component: NextPageWithLayout;
};

export default function App({
	session,
	Component,
	pageProps,
}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((c) => c);

	return (
		<ChakraProvider value={system}>
			{" "}
			<Head>
				<title>Happy Little Dinosaurs</title>
				<meta charSet="utf-8" />
				<meta
					name="description"
					content="Happy Little Dinosaurs: A fun and engaging card game"
				/>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="apple-touch-icon" href="/logo.png" sizes="192x192" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black"
				/>
			</Head>
			<SessionProvider session={session}>
				<ClickSpark
					sparkColor="#fff"
					sparkSize={10}
					sparkRadius={15}
					sparkCount={8}
					duration={400}
				>
					{getLayout(<Component {...pageProps} />)}
				</ClickSpark>
			</SessionProvider>
		</ChakraProvider>
	);
}
