import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/config/prisma";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.NEXTGOOGLE_ID || "",
			clientSecret: process.env.NEXTGOOGLE_SECRET || "",
		}),
		DiscordProvider({
			clientId: process.env.NEXT_DISCORD_CLIENT_ID || "",
			clientSecret: process.env.NEXT_DISCORD_CLIENT_SECRET || "",
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
		async session({ session, user }) {
			//@ts-expect-error --> Added manually
			session.user.lastChangedName = user.lastChangedName || null;
			//@ts-expect-error --> Added manually
			session.user.totalWins = user.totalWins || 0;
			//@ts-expect-error --> Added manually
			session.user.totalGames = user.totalGames || 0;
			//@ts-expect-error --> Added manually
			session.user.podiumPlacements = user.podiumPlacements || 0;
			//@ts-expect-error --> Added manually
			session.user.activeRooms = user.activeRooms || [];

			return session;
		},
	},
	debug: true,
};

export default NextAuth(authOptions);
