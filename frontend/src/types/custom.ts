import { Database } from "./database";

type Lobby = Database["public"]["Tables"]["Lobby"]["Row"];
type LobbyUser = Database["public"]["Tables"]["LobbyUser"]["Row"];
type LobbyPlayer = Database["public"]["Tables"]["User"]["Row"];

export type LobbyWithPlayers = Lobby & {
	LobbyUser: (LobbyUser & {
		User: LobbyPlayer;
	})[];
};
