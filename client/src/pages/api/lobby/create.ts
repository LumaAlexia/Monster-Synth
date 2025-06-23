import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	if (session) {
		try {
			const lobbyData = req.body;

			const response = await fetch("http://localhost:3001/lobby", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(lobbyData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Errore nella creazione della lobby"
				);
			}

			res.status(201).json(data);
		} catch (error) {
			console.error("Errore nella creazione della lobby:", error);
			res.status(500).json({ error: "Impossibile creare la lobby" });
		}
	} else {
		// Not Signed in
		res.status(401).json({
			error: "Non sei autenticato",
		});
	}
}
