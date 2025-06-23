import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "@/pages/_app";
import {
	Box,
	Heading,
	Text,
	Flex,
	Spacer,
	Spinner,
	HStack,
	VStack,
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import RefreshButton from "@/components/RefreshButton";
import { LobbyWithPlayers } from "@/types/custom";
import CreateLobby from "@/components/CreateLobby";
import LobbyView from "@/components/views/LobbyView";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const LobbyPage: NextPageWithLayout = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	// Stato per gestire il modale per evitare polling
	const [isDialogOpen, setDialogOpen] = useState(false);

	// Stato per gestire il caricamento delle lobby
	const [isLoading, setIsLoading] = useState(false);
	const [lobbies, setLobbies] = useState<LobbyWithPlayers[]>([]);

	// Stato per gestire le lobby dell'utente
	const [myLobbies, setMyLobbies] = useState<LobbyWithPlayers[]>([]);
	const [isMyLobbiesLoading, setIsMyLobbiesLoading] = useState(false);

	const [activeTab, setActiveTab] = useState("public-rooms");

	// Funzione per caricare le lobby pubbliche
	const fetchLobbies = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/lobby/public");
			const lobbiesData: LobbyWithPlayers[] = await response.json();
			setLobbies(lobbiesData);
		} catch (error) {
			console.error("Errore nel caricamento delle lobby:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Funzione placeholder per caricare le lobby dell'utente
	const fetchMyLobbies = async () => {
		setIsMyLobbiesLoading(true);
		try {
			// Placeholder per la chiamata API
			console.log("Caricamento delle lobby dell'utente...");
			console.log("userId:", session?.user?.name);

			// Simula un ritardo per mostrare lo spinner
			setTimeout(() => {
				setIsMyLobbiesLoading(false);
			}, 1000);
		} catch (error) {
			console.error("Errore nel caricamento delle tue lobby:", error);
			setIsMyLobbiesLoading(false);
		}
	};

	useEffect(() => {
		if (isDialogOpen) return; // Pause polling when dialog is open

		// Fetch the correct lobbies on mount or tab change
		console.log("initial fetch");
		if (activeTab === "public-rooms") {
			fetchLobbies();
		} else {
			fetchMyLobbies();
		}

		// Set up polling
		const interval = setInterval(() => {
			console.log("timed fetch");
			if (activeTab === "public-rooms") {
				fetchLobbies();
			} else {
				fetchMyLobbies();
			}
		}, 10000);

		return () => clearInterval(interval);
	}, [activeTab, session, isDialogOpen]);

	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	if (status === "loading") {
		return (
			<Flex
				alignItems="center"
				justifyContent="center"
				minH="calc(100vh - 100px)"
				direction="column"
				gap={4}
			>
				<Spinner size="xl" color={colors.xanthous.DEFAULT} />
				<Text
					color={colors.primaryText}
					fontSize="xl"
					fontWeight="bold"
				>
					Caricamento...
				</Text>
			</Flex>
		);
	}

	if (status === "unauthenticated" || !session) {
		router.push("/auth/signin");
		return null;
	}

	return (
		<Box
			py={10}
			px={{ base: 4, md: 8 }}
			color={colors.primaryText}
			minH="calc(100vh - 100px)"
			bgGradient={`linear(to-b, ${colors.dark_purple.DEFAULT}, ${colors.dark_purple[600]})`}
		>
			<MotionBox
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Flex
					mb={8}
					alignItems="center"
					direction={{ base: "column", md: "row" }}
				>
					<VStack align={{ base: "center", md: "start" }} gap={2}>
						<Heading
							as="h1"
							size="4xl"
							color={colors.xanthous.DEFAULT}
							textAlign={{ base: "center", md: "left" }}
							fontWeight="extrabold"
							textShadow="0 2px 4px rgba(0,0,0,0.4)"
						>
							Lobby di Gioco
						</Heading>
						<Text
							fontSize="lg"
							color={colors.primaryText}
							opacity={0.8}
						>
							Trova una lobby o crea la tua per iniziare a
							giocare!
						</Text>
					</VStack>

					<Spacer />

					<HStack gap={4} mt={{ base: 6, md: 0 }}>
						<CreateLobby setDialogOpen={setDialogOpen} />
					</HStack>
				</Flex>
			</MotionBox>

			<LobbyView
				lobbies={lobbies}
				myLobbies={myLobbies}
				handleTabChange={handleTabChange}
				activeTab={activeTab}
				isLoading={isLoading}
				isMyLobbiesLoading={isMyLobbiesLoading}
			/>

			<Box mt={10} textAlign="center" opacity={0.7}>
				<Text fontSize="sm">
					Happy Little Dinosaurs - Lobby di Gioco
				</Text>
			</Box>
		</Box>
	);
};

LobbyPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default LobbyPage;
