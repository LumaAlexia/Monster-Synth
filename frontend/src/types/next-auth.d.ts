import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	/* Temporarily commented out to avoid type errors in the project.
	interface Session {
		user: {
			lastChangedName?: Date | null;
			totalWins?: number | null;
			totalGames?: number | null;
			podiumPlacements?: number | null;
			activeRooms?: number | null;
		} & DefaultSession["user"];
	}
		*/
}
