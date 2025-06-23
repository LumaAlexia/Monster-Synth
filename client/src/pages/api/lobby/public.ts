import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (session) {
		try {
			const response = await fetch("http://localhost:3001/lobby/public");
			const data = await response.json();
			console.log("Lobby pubbliche:", JSON.stringify(data, null, 2));
			res.status(200).json(data);
		} catch (error) {
			console.error("Errore nel recupero delle lobby pubbliche:", error);
			res.status(500).json({
				error: "Impossibile recuperare le lobby pubbliche",
			});
		}
	} else {
		// Not Signed in
		res.status(401).json({
			error: "Non sei autenticato",
		});
	}
}
