import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/config/prisma";
import { User, Session } from "next-auth";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.NEXTGOOGLE_ID || "",
			clientSecret: process.env.NEXTGOOGLE_SECRET || "",
		}),
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
		signIn: async ({ user }: { user: User }) => {
			// Logica per gestire il login
			console.log("User signed in:", user);
		},
		signOut: async ({ session }: { session: Session }) => {
			// Logica per gestire il logout
			console.log("User signed out:", session);
		},
	},
	session: {
		maxAge: 30 * 24 * 60 * 60, // 30 giorni
		updateAge: 24 * 60 * 60, // 24 ore
	},
	debug: true,
};

export default NextAuth(authOptions);
