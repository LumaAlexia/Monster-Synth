import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/config/prisma";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		/* Possible future provider
		GoogleProvider({
			clientId: process.env.NEXTGOOGLE_ID || "",
			clientSecret: process.env.NEXTGOOGLE_SECRET || "",
		}),
		*/
		GithubProvider({
			clientId: process.env.NEXT_GITHUB_CLIENT_ID || "",
			clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET || "",
		}),
	],
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		// error: "/auth/error", // Pagina di errore custom se necessaria
	},
	events: {
		signIn: async ({ user, account, profile }) => {
			// Logica per gestire il login
			console.log("User signed in:", user);
		},
		signOut: async ({ session }) => {
			// Logica per gestire il logout
			console.log("User signed out:", session);
		},
	},
	session: {
		maxAge: 30 * 24 * 60 * 60, // 30 giorni
		updateAge: 24 * 60 * 60, // 24 ore
	},
	callbacks: {
		/* Custom Fields for session
		async session({ session, user }) {
			
			//@ts-expect-error --> Added manually
			session.user.lastChangedName = user.lastChangedName || null;

			return session;
		},
		*/
	},
	debug: true,
};

export default NextAuth(authOptions);
