import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactNode } from "react";
import Head from "next/head";

import "@/theme/globals.css";
import { system } from "@/theme";
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
				<title>Monster Synth</title>
				<meta charSet="utf-8" />
				<meta
					name="description"
					content="Monster Synth: A thrilling multiplayer game where you control a monster, collect power-ups, and battle against other players in a dynamic arena. Join the fun and see if you can become the ultimate monster champion!"
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
