import { colors } from "@/theme/colors";
import {
	Badge,
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	HStack,
	Icon,
	Spinner,
	Tabs,
	Text,
} from "@chakra-ui/react";
import {
	FaGamepad,
	FaSearch,
	FaSync,
	FaUserAlt,
	FaUsers,
} from "react-icons/fa";
import { LobbyWithPlayers } from "@/types/custom";
import { motion } from "framer-motion";
import LobbyCard from "../LobbyCard";

const MotionBox = motion.create(Box);

export default function LobbyView({
	lobbies,
	myLobbies,
	handleTabChange,
	activeTab,
	isLoading,
	isMyLobbiesLoading,
}: {
	lobbies: LobbyWithPlayers[];
	myLobbies: LobbyWithPlayers[];
	handleTabChange: (tab: string) => void;
	activeTab: string;
	isLoading: boolean;
	isMyLobbiesLoading: boolean;
}) {
	return (
		<Box
			bg={colors.dark_purple[500]}
			borderRadius="xl"
			p={6}
			boxShadow="xl"
			borderWidth="1px"
			borderColor={colors.walnut_brown[600]}
		>
			<Tabs.Root colorScheme="yellow" defaultValue={"public-rooms"}>
				<Tabs.List
					mb={6}
					justifyContent="center"
					bg={colors.dark_purple[400]}
					p={2}
					borderRadius="lg"
					gap={4}
				>
					<Tabs.Trigger
						_selected={{
							bg: colors.xanthous.DEFAULT,
							color: colors.dark_purple.DEFAULT,
							fontWeight: "bold",
							transform: "translateY(-2px)",
							boxShadow: "md",
						}}
						color={colors.primaryText}
						value="public-rooms"
						rounded={"md"}
						p={4}
						transition="all 0.3s"
						_hover={{
							bg: colors.xanthous[700],
							color: colors.dark_purple.DEFAULT,
						}}
					>
						<Icon as={FaUsers} size={"md"} /> Stanze Pubbliche
					</Tabs.Trigger>
					<Tabs.Trigger
						_selected={{
							bg: colors.xanthous.DEFAULT,
							color: colors.dark_purple.DEFAULT,
							fontWeight: "bold",
							transform: "translateY(-2px)",
							boxShadow: "md",
						}}
						color={colors.primaryText}
						value="my-rooms"
						rounded={"md"}
						p={4}
						transition="all 0.3s"
						_hover={{
							bg: colors.xanthous[700],
							color: colors.dark_purple.DEFAULT,
						}}
					>
						<Icon as={FaUserAlt} size={"md"} />
						Le Mie Stanze
					</Tabs.Trigger>
				</Tabs.List>

				<Tabs.Content value="public-rooms">
					<MotionBox
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: activeTab === "public-rooms" ? 1 : 0,
							y: activeTab === "public-rooms" ? 0 : 20,
						}}
						transition={{ duration: 0.3 }}
					>
						<Flex
							justify="space-between"
							align="center"
							mb={6}
							direction={{ base: "column", md: "row" }}
							gap={{ base: 4, md: 0 }}
						>
							<HStack>
								<Icon
									as={FaGamepad}
									color={colors.xanthous.DEFAULT}
									boxSize={6}
								/>
								<Heading size="lg" color={colors.primaryText}>
									Stanze Disponibili
								</Heading>
								{!isLoading && (
									<Badge
										colorScheme="green"
										fontSize="md"
										py={1}
										px={2}
									>
										{lobbies.length} trovate
									</Badge>
								)}
							</HStack>

							<HStack gap={4}>
								<Text color={colors.primaryText} fontSize="sm">
									Aggiornamento automatico ogni 10 secondi
								</Text>
								{isLoading && (
									<Spinner
										size="sm"
										color={colors.xanthous.DEFAULT}
									/>
								)}
							</HStack>
						</Flex>

						{isLoading && lobbies.length === 0 ? (
							<Flex
								justify="center"
								align="center"
								h="300px"
								direction="column"
								gap={4}
							>
								<Spinner
									size="xl"
									color={colors.xanthous.DEFAULT}
								/>
								<Text fontSize="lg">Caricamento stanze...</Text>
							</Flex>
						) : lobbies.length > 0 ? (
							<Grid
								templateColumns={{
									base: "1fr",
									md: "repeat(2, 1fr)",
									lg: "repeat(3, 1fr)",
								}}
								gap={6}
							>
								{lobbies.map((lobby, index) => (
									<MotionBox
										key={lobby.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: index * 0.1,
										}}
									>
										<LobbyCard
											id={lobby.id}
											name={lobby.name}
											players={lobby.LobbyUser}
											maxPlayers={lobby.maxPlayers}
										/>
									</MotionBox>
								))}
							</Grid>
						) : (
							<Flex
								justify="center"
								align="center"
								h="200px"
								direction="column"
								gap={4}
								bg={colors.dark_purple[400]}
								borderRadius="lg"
								p={6}
							>
								<Icon
									as={FaSearch}
									boxSize={10}
									color={colors.xanthous.DEFAULT}
								/>
								<Text fontSize="xl">
									Nessuna stanza pubblica disponibile
								</Text>
								<Text fontSize="md" opacity={0.8}>
									Crea una nuova stanza o riprova più tardi
								</Text>
							</Flex>
						)}
					</MotionBox>
				</Tabs.Content>

				<Tabs.Content value="my-rooms">
					<MotionBox
						initial={{ opacity: 0, y: 20 }}
						animate={{
							opacity: activeTab === "my-rooms" ? 1 : 0,
							y: activeTab === "my-rooms" ? 0 : 20,
						}}
						transition={{ duration: 0.3 }}
					>
						<Flex
							justify="space-between"
							align="center"
							mb={6}
							direction={{ base: "column", md: "row" }}
							gap={{ base: 4, md: 0 }}
						>
							<HStack>
								<Icon
									as={FaUserAlt}
									color={colors.xanthous.DEFAULT}
									boxSize={6}
								/>
								<Heading size="lg" color={colors.primaryText}>
									Stanze a Cui Partecipi
								</Heading>
							</HStack>

							<HStack gap={4}>
								<Text color={colors.primaryText} fontSize="sm">
									Aggiornamento automatico ogni 5 secondi
								</Text>
								{isMyLobbiesLoading && (
									<Spinner
										size="sm"
										color={colors.xanthous.DEFAULT}
									/>
								)}
							</HStack>
						</Flex>

						{isMyLobbiesLoading ? (
							<Flex
								justify="center"
								align="center"
								h="300px"
								direction="column"
								gap={4}
							>
								<Spinner
									size="xl"
									color={colors.xanthous.DEFAULT}
								/>
								<Text fontSize="lg">
									Caricamento delle tue stanze...
								</Text>
							</Flex>
						) : (
							<Flex
								justify="center"
								align="center"
								h="200px"
								direction="column"
								gap={4}
								bg={colors.dark_purple[400]}
								borderRadius="lg"
								p={6}
							>
								<Icon
									as={FaUserAlt}
									boxSize={10}
									color={colors.xanthous.DEFAULT}
								/>
								<Text fontSize="xl">
									Non fai parte di nessuna stanza al momento
								</Text>
								<Text fontSize="md" opacity={0.8}>
									Unisciti a una stanza pubblica o creane una
									nuova
								</Text>
							</Flex>
						)}
					</MotionBox>
				</Tabs.Content>
			</Tabs.Root>
		</Box>
	);
}
