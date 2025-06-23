import {
  Box,
  Flex,
  Text,
  HStack,
  Icon,
  Badge, Button
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import { useState, useRef, useEffect } from "react";
import { LobbyWithPlayers } from "@/types/custom";
import { FaUsers, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const LobbyCard: React.FC<LobbyWithPlayers> = ({
	id,
	name,
	players,
	maxPlayers,
}) => {
	const [isHovered, setIsHovered] = useState(false);
	const controls = useAnimation();
	const router = useRouter();
	const cardRef = useRef<HTMLDivElement>(null);

	// Effetto di pulsazione per il bottone "Unisciti"
	useEffect(() => {
		if (isHovered) {
			controls.start({
				scale: [1, 1.05, 1],
				transition: { repeat: Infinity, duration: 1.5 },
			});
		} else {
			controls.stop();
			controls.set({ scale: 1 });
		}
	}, [isHovered, controls]);

	const handleJoinLobby = () => {
		console.log(`Navigating to lobby ${id}`);
		router.push(`/lobby/${id}`);
	};

	// Calcola il colore di sfondo in base al numero di giocatori
	const getBackgroundGradient = () => {
		const ratio = players.length / maxPlayers;

		if (ratio >= 1) {
			return `linear(to-br, ${colors.dark_purple[500]}, ${colors.bittersweet.DEFAULT}, ${colors.dark_purple[600]})`;
		} else if (ratio >= 0.5) {
			return `linear(to-br, ${colors.dark_purple[500]}, ${colors.xanthous.DEFAULT}, ${colors.dark_purple[600]})`;
		} else {
			return `linear(to-br, ${colors.dark_purple[500]}, ${colors.pigment_green.DEFAULT}, ${colors.dark_purple[600]})`;
		}
	};

	return (
		<MotionBox
			ref={cardRef}
			bg={colors.dark_purple[500]}
			bgGradient={isHovered ? getBackgroundGradient() : undefined}
			borderRadius="xl"
			borderWidth="2px"
			borderColor={
				isHovered ? colors.xanthous.DEFAULT : colors.walnut_brown[600]
			}
			p={5}
			transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
			_hover={{
				transform: "translateY(-8px) scale(1.02)",
				boxShadow: `0 15px 25px -5px rgba(0,0,0,0.5)`,
			}}
			cursor="pointer"
			onClick={handleJoinLobby}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			position="relative"
			overflow="hidden"
			whileHover={{
				rotateY: [0, 5, 0],
				transition: { duration: 0.5 },
			}}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			height="100%"
		>
			{/* Effetto particelle di sfondo quando hover */}
			{isHovered && (
				<Box
					position="absolute"
					top={0}
					left={0}
					right={0}
					bottom={0}
					opacity={0.1}
					zIndex={0}
					backgroundImage="url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')"
					backgroundSize="20px 20px"
					animation="sparkle 3s linear infinite"
				/>
			)}

			<MotionFlex
				direction="column"
				height="100%"
				position="relative"
				zIndex={1}
			>
				<Flex align="center" mb={3} justify="space-between">
					<HStack display="flex" gap={1}>
						<Badge
							colorScheme="purple"
							variant="solid"
							px={2}
							py={1}
							borderRadius="md"
						>
							ID: {id}
						</Badge>
					</HStack>

					<Badge
						colorScheme={
							players.length === maxPlayers ? "red" : "green"
						}
						variant="solid"
						px={2}
						py={1}
						borderRadius="md"
					>
						{players.length === maxPlayers
							? "Piena"
							: "Disponibile"}
					</Badge>
				</Flex>

				<MotionText
					fontSize="2xl"
					fontWeight="extrabold"
					mb={4}
					color={colors.xanthous.DEFAULT}
					style={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}}
					animate={{
						textShadow: isHovered
							? "0 0 8px rgba(247, 179, 43, 0.6)"
							: "none",
					}}
				>
					{name}
				</MotionText>

				<Flex mt="auto" justify="space-between" align="center">
					<HStack spacing={2}>
						<Icon as={FaUsers} color={colors.primaryText} />
						<Box
							bg={
								players.length === maxPlayers
									? colors.bittersweet.DEFAULT
									: colors.pigment_green.DEFAULT
							}
							color={colors.primaryText}
							borderRadius="full"
							px={3}
							py={2}
							fontSize="sm"
							fontWeight="bold"
						>
							{players.length}/{maxPlayers}
						</Box>
					</HStack>

					<MotionBox
						as={Button}
						bg={colors.xanthous.DEFAULT}
						color={colors.dark_purple.DEFAULT}
						_hover={{ bg: colors.xanthous[600] }}
						fontWeight="bold"
						px={4}
						py={2}
						borderRadius="md"
						fontSize="md"
						rightIcon={<Icon as={FaArrowRight} />}
						animate={controls}
						onClick={(e) => {
							e.stopPropagation();
							handleJoinLobby();
						}}
					>
						Unisciti
					</MotionBox>
				</Flex>

				{/* Mostra i giocatori in hover */}
				{isHovered && players.length > 0 && (
					<MotionBox
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						mt={4}
						pt={4}
						borderTopWidth="1px"
						borderTopColor="rgba(255,255,255,0.1)"
					>
						<Text fontSize="sm" mb={2} fontWeight="bold">
							Giocatori:
						</Text>
						<Flex wrap="wrap" gap={2}>
							{players.slice(0, 3).map((player, index) => (
								<Badge
									key={index}
									colorScheme="yellow"
									variant="subtle"
									px={2}
									py={1}
									borderRadius="md"
								>
									{player.User?.name ||
										`Giocatore ${index + 1}`}
								</Badge>
							))}
							{players.length > 3 && (
								<Badge
									colorScheme="gray"
									variant="subtle"
									px={2}
									py={1}
									borderRadius="md"
								>
									+{players.length - 3}
								</Badge>
							)}
						</Flex>
					</MotionBox>
				)}
			</MotionFlex>

			{/* Indicatore di hover */}
			<MotionBox
				position="absolute"
				bottom={0}
				left={0}
				right={0}
				height="3px"
				bg={colors.xanthous.DEFAULT}
				initial={{ width: "0%" }}
				animate={{ width: isHovered ? "100%" : "0%" }}
				transition={{ duration: 0.3 }}
			/>
		</MotionBox>
	);
};

export default LobbyCard;
