import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
	Button,
	Heading,
	Input,
	Switch,
	HStack,
	Dialog,
	Portal,
	CloseButton,
	Stack,
	Field,
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import { FaPlus } from "react-icons/fa";
import { HiCheck, HiX } from "react-icons/hi";

const CreateLobby = ({
	setDialogOpen,
}: {
	setDialogOpen: (state: boolean) => void;
}) => {
	const { data: session } = useSession();
	const router = useRouter();

	const [lobbyName, setLobbyName] = useState("");
	const [maxPlayers, setMaxPlayers] = useState(6);
	const [isPrivate, setIsPrivate] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [nameError, setNameError] = useState("");

	// Validate lobby name
	const validateLobbyName = (name: string) => {
		if (name.trim().length < 3) {
			setNameError(
				"Il nome della lobby deve contenere almeno 3 caratteri"
			);
			return false;
		}
		if (name.trim().length > 30) {
			setNameError("Il nome della lobby non può superare i 30 caratteri");
			return false;
		}
		setNameError("");
		return true;
	};

	// Funzione per creare una nuova lobby
	const createLobby = async () => {
		if (!session || !session.user) return;
		if (!validateLobbyName(lobbyName)) return;

		setIsCreating(true);
		try {
			const response = await fetch("/api/lobby", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name:
						lobbyName ||
						`Lobby di ${session.user.name || "Giocatore"}`,
					isPrivate,
					maxPlayers,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				router.push(`/lobby/${data.id}`);
			}
		} catch (error) {
			console.error("Errore nella creazione della lobby:", error);
			setIsCreating(false);
		}
	};

	return (
		<Dialog.Root
			size="xl"
			placement="center"
			motionPreset="slide-in-bottom"
			role="alertdialog"
			onOpenChange={(details) => {
				setDialogOpen(details.open);
			}}
		>
			<Dialog.Trigger asChild>
				<Button
					bg={colors.bittersweet.DEFAULT}
					color={colors.primaryText}
					_hover={{
						bg: colors.bittersweet[600],
						transform: "translateY(-2px)",
						boxShadow: "lg",
					}}
					transition="all 0.3s"
					_active={{
						transform: "scale(0.98)",
					}}
				>
					<FaPlus /> Crea Lobby
				</Button>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content bgColor={colors.walnut_brown.DEFAULT}>
						<Dialog.Header>
							<HStack justifyContent="space-between">
								<Dialog.Title>
									<Heading
										size="2xl"
										color={colors.primaryText}
									>
										Crea la tua Lobby!
									</Heading>
								</Dialog.Title>
								<Dialog.CloseTrigger asChild>
									<CloseButton
										bg={colors.dark_purple.DEFAULT}
										color={colors.primaryText}
										size="lg"
									/>
								</Dialog.CloseTrigger>
							</HStack>
						</Dialog.Header>

						<Dialog.Body pb="4">
							<Stack gap="4">
								<Field.Root>
									<Field.Label
										color={colors.xanthous.DEFAULT}
									>
										Nome della Lobby
									</Field.Label>
									<Input
										placeholder="Bingo e Bongo"
										onInput={(e) =>
											setLobbyName(e.currentTarget.value)
										}
									/>
								</Field.Root>
								<Field.Root>
									<Field.Label
										color={colors.xanthous.DEFAULT}
									>
										Numero di Giocatori Massimi
									</Field.Label>
									<Input
										placeholder="6"
										type="number"
										min={2}
										max={10}
										onInput={(e) =>
											setMaxPlayers(
												Number(e.currentTarget.value)
											)
										}
									/>
								</Field.Root>
								<Field.Root>
									<Field.Label
										color={colors.xanthous.DEFAULT}
									>
										Stanza Privata
									</Field.Label>
									<Switch.Root
										size={"lg"}
										checked={isPrivate}
										onCheckedChange={(event) =>
											setIsPrivate(event.checked)
										}
										checkedBg={
											colors.bright_dino_green.DEFAULT
										}
									>
										<Switch.HiddenInput />
										<Switch.Control>
											<Switch.Thumb>
												<Switch.ThumbIndicator
													fallback={
														<HiX color="black" />
													}
												>
													<HiCheck />
												</Switch.ThumbIndicator>
											</Switch.Thumb>
										</Switch.Control>
									</Switch.Root>
								</Field.Root>
							</Stack>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button
									variant="outline"
									color={colors.primaryText}
									borderColor={colors.dark_purple[700]}
									bg={colors.dark_purple[500]}
									_hover={{
										bg: colors.dark_purple[600],
										color: colors.primaryText,
									}}
								>
									Cancella
								</Button>
							</Dialog.ActionTrigger>
							<Button
								bg={colors.pigment_green.DEFAULT}
								color={colors.primaryText}
								_hover={{
									bg: colors.pigment_green[600],
									transform: "translateY(-2px)",
									boxShadow: "lg",
								}}
								transition="all 0.3s"
								_active={{
									transform: "scale(0.98)",
								}}
							>
								Conferma
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default CreateLobby;
