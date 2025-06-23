import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "@/pages/_app";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spacer,
  Button,
  Grid,
  GridItem,
  useToast,
  Spinner,
  Badge,
  Divider,
  IconButton,
  useClipboard,
  Tooltip,
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PlayerCard from "@/components/PlayerCard";
import DinosaurSelector from "@/components/DinosaurSelector";
import ReadyButton from "@/components/ReadyButton";
import { useWebSocket } from "@/components/WebSocketProvider";
import { FaShare, FaCopy, FaArrowLeft } from "react-icons/fa";

interface LobbyPlayer {
  userId: string;
  name: string;
  image: string;
  dinosaur: string;
  isReady: boolean;
  socketId: string | null;
}

interface LobbyState {
  id: string;
  name: string;
  ownerId: string;
  maxPlayers: number;
  isPrivate: boolean;
  players: LobbyPlayer[];
}

const LobbyDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const toast = useToast();
  const { socket, isConnected, connect } = useWebSocket();
  const { onCopy, hasCopied } = useClipboard();

  const [lobbyState, setLobbyState] = useState<LobbyState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDinosaur, setSelectedDinosaur] = useState("T-Rex");
  const [isReady, setIsReady] = useState(false);
  const [allPlayersReady, setAllPlayersReady] = useState(false);

  // Connessione WebSocket quando l'utente è autenticato
  useEffect(() => {
    if (session?.user && id) {
      connect(
        session.user.id as string,
        session.user.name || "Utente",
        session.user.image || ""
      );
    }
  }, [session, connect, id]);

  // Gestione degli eventi WebSocket
  useEffect(() => {
    if (!socket || !session?.user || !id) return;

    // Richiedi di entrare nella lobby
    const joinLobby = () => {
      socket.emit(
        "joinLobby",
        {
          lobbyId: id,
          userId: session.user.id,
          userName: session.user.name || "Utente",
          userImage: session.user.image || "",
          dinosaur: selectedDinosaur,
        },
        (response: {success: boolean, lobby?: LobbyState, error?: string}) => {
          if (response.success && response.lobby) {
            setLobbyState(response.lobby);
            setIsLoading(false);
            
            // Trova il giocatore corrente e aggiorna lo stato
            const currentPlayer = response.lobby.players.find(
              (p: LobbyPlayer) => p.userId === session.user.id
            );
            if (currentPlayer) {
              setSelectedDinosaur(currentPlayer.dinosaur);
              setIsReady(currentPlayer.isReady);
            }
            
            toast({
              title: "Connesso alla lobby",
              description: `Sei entrato nella lobby: ${response.lobby.name}`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Errore",
              description: response.error || "Impossibile entrare nella lobby",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            router.push("/lobby");
          }
        }
      );
    };

    // Connettiti alla lobby quando il socket è pronto
    if (isConnected) {
      joinLobby();
    }

    // Gestione degli eventi in arrivo
    socket.on("lobbyState", (state: LobbyState) => {
      setLobbyState(state);
      
      // Trova il giocatore corrente e aggiorna lo stato
      const currentPlayer = state.players.find(
        (p) => p.userId === session.user.id
      );
      if (currentPlayer) {
        setSelectedDinosaur(currentPlayer.dinosaur);
        setIsReady(currentPlayer.isReady);
      }
      
      // Verifica se tutti i giocatori sono pronti
      const allReady = state.players.length >= 2 && state.players.every(p => p.isReady);
      setAllPlayersReady(allReady);
    });

    socket.on("playerJoined", (player: LobbyPlayer) => {
      toast({
        title: "Nuovo giocatore",
        description: `${player.name} è entrato nella lobby`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    });

    socket.on("playerLeft", (data: { userId: string }) => {
      if (lobbyState) {
        const player = lobbyState.players.find(p => p.userId === data.userId);
        if (player) {
          toast({
            title: "Giocatore uscito",
            description: `${player.name} ha lasciato la lobby`,
            status: "info",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    });

    socket.on("playerReadyChanged", (data: { userId: string, isReady: boolean }) => {
      if (lobbyState) {
        const player = lobbyState.players.find(p => p.userId === data.userId);
        if (player && player.userId === session.user.id) {
          setIsReady(data.isReady);
        }
      }
    });

    socket.on("playerDinosaurChanged", (data: { userId: string, dinosaur: string }) => {
      if (lobbyState) {
        const player = lobbyState.players.find(p => p.userId === data.userId);
        if (player && player.userId === session.user.id) {
          setSelectedDinosaur(data.dinosaur);
        }
      }
    });

    socket.on("ownerChanged", (data: { newOwnerId: string }) => {
      if (data.newOwnerId === session.user.id) {
        toast({
          title: "Sei il nuovo proprietario",
          description: "Sei diventato il proprietario della lobby",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }
    });

    socket.on("allPlayersReady", () => {
      setAllPlayersReady(true);
      toast({
        title: "Tutti pronti!",
        description: "Tutti i giocatori sono pronti. La partita può iniziare!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });

    socket.on("playerDisconnected", (data: { userId: string }) => {
      if (lobbyState) {
        const player = lobbyState.players.find(p => p.userId === data.userId);
        if (player) {
          toast({
            title: "Giocatore disconnesso",
            description: `${player.name} si è disconnesso`,
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    });

    socket.on("playerReconnected", (data: { userId: string }) => {
      if (lobbyState) {
        const player = lobbyState.players.find(p => p.userId === data.userId);
        if (player) {
          toast({
            title: "Giocatore riconnesso",
            description: `${player.name} si è riconnesso`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    });

    // Pulizia degli eventi alla disinstallazione
    return () => {
      socket.off("lobbyState");
      socket.off("playerJoined");
      socket.off("playerLeft");
      socket.off("playerReadyChanged");
      socket.off("playerDinosaurChanged");
      socket.off("ownerChanged");
      socket.off("allPlayersReady");
      socket.off("playerDisconnected");
      socket.off("playerReconnected");
    };
  }, [socket, session, id, isConnected, router, toast, selectedDinosaur, lobbyState]);

  const handleLeaveLobby = () => {
    if (socket && session?.user && id) {
      socket.emit(
        "leaveLobby",
        {
          lobbyId: id,
          userId: session.user.id,
        },
        (response: {success: boolean, error?: string}) => {
          if (response.success) {
            toast({
              title: "Hai lasciato la lobby",
              status: "info",
              duration: 3000,
              isClosable: true,
            });
            router.push("/lobby");
          }
        }
      );
    } else {
      router.push("/lobby");
    }
  };

  const handleToggleReady = () => {
    if (socket && session?.user && id) {
      socket.emit(
        "setReady",
        {
          lobbyId: id,
          userId: session.user.id,
          isReady: !isReady,
        },
        (response: {success: boolean, error?: string}) => {
          if (!response.success) {
            toast({
              title: "Errore",
              description: response.error || "Impossibile cambiare lo stato",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      );
    }
  };

  const handleChangeDinosaur = (dinosaur: string) => {
    if (socket && session?.user && id) {
      socket.emit(
        "changeDinosaur",
        {
          lobbyId: id,
          userId: session.user.id,
          dinosaur,
        },
        (response: {success: boolean, error?: string}) => {
          if (!response.success) {
            toast({
              title: "Errore",
              description: response.error || "Impossibile cambiare il dinosauro",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      );
    }
  };

  const handleStartGame = () => {
    toast({
      title: "Partita iniziata!",
      description: "La partita sta per iniziare...",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Qui andrebbe la logica per iniziare la partita
  };

  const handleShareLobby = () => {
    onCopy();
    toast({
      title: "Link copiato",
      description: "Link della lobby copiato negli appunti",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (status === "loading" || isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="calc(100vh - 100px)"
      >
        <Spinner color={colors.primaryText} size="xl" thickness="4px" mr={3} />
        <Text color={colors.primaryText} fontSize="xl">
          Caricamento lobby...
        </Text>
      </Box>
    );
  }

  if (status === "unauthenticated" || !session) {
    router.push("/auth/signin");
    return null;
  }

  if (!lobbyState) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="calc(100vh - 100px)"
        color={colors.primaryText}
      >
        <Text fontSize="xl">Lobby non trovata o errore di connessione</Text>
        <Button
          ml={4}
          onClick={() => router.push("/lobby")}
          bg={colors.pigment_green.DEFAULT}
          color={colors.primaryText}
          _hover={{ bg: colors.pigment_green[600] }}
        >
          Torna alle Lobby
        </Button>
      </Box>
    );
  }

  const isOwner = session.user.id === lobbyState.ownerId;

  return (
    <Box
      py={10}
      px={{ base: 4, md: 8 }}
      color={colors.primaryText}
      minH="calc(100vh - 100px)"
    >
      <Flex mb={6} align="center">
        <IconButton
          aria-label="Torna alle lobby"
          icon={<FaArrowLeft />}
          onClick={handleLeaveLobby}
          bg={colors.walnut_brown.DEFAULT}
          color={colors.primaryText}
          _hover={{ bg: colors.walnut_brown[600] }}
          mr={4}
        />
        <Heading
          as="h1"
          size="2xl"
          color={colors.xanthous.DEFAULT}
          isTruncated
          maxW={{ base: "200px", sm: "300px", md: "500px" }}
        >
          {lobbyState.name}
        </Heading>
        <Spacer />
        <Tooltip label="Condividi link lobby">
          <IconButton
            aria-label="Condividi lobby"
            icon={hasCopied ? <FaCopy /> : <FaShare />}
            onClick={handleShareLobby}
            bg={colors.pigment_green.DEFAULT}
            color={colors.primaryText}
            _hover={{ bg: colors.pigment_green[600] }}
          />
        </Tooltip>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 300px" }}
        gap={8}
      >
        <GridItem>
          <Box
            bg={colors.dark_purple[500]}
            borderRadius="lg"
            p={6}
            mb={6}
            borderWidth="2px"
            borderColor={colors.walnut_brown[600]}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="lg" color={colors.xanthous.DEFAULT}>
                Giocatori
              </Heading>
              <Badge
                bg={lobbyState.players.length === lobbyState.maxPlayers ? colors.bittersweet.DEFAULT : colors.pigment_green.DEFAULT}
                color={colors.primaryText}
                borderRadius="full"
                px={3}
                py={1}
                fontSize="md"
              >
                {lobbyState.players.length}/{lobbyState.maxPlayers}
              </Badge>
            </Flex>

            <Box maxH="400px" overflowY="auto" pr={2}>
              {lobbyState.players.map((player) => (
                <PlayerCard
                  key={player.userId}
                  name={player.name}
                  image={player.image}
                  dinosaur={player.dinosaur}
                  isReady={player.isReady}
                  isOwner={player.userId === lobbyState.ownerId}
                  isCurrentUser={player.userId === session.user.id}
                />
              ))}
            </Box>
          </Box>

          {isOwner && (
            <Button
              width="100%"
              size="lg"
              bg={colors.xanthous.DEFAULT}
              color={colors.dark_purple.DEFAULT}
              _hover={{ bg: colors.xanthous[600] }}
              isDisabled={!allPlayersReady || lobbyState.players.length < 2}
              onClick={handleStartGame}
              py={8}
              fontSize="xl"
              fontWeight="bold"
            >
              Inizia Partita
            </Button>
          )}
        </GridItem>

        <GridItem>
          <Box
            bg={colors.dark_purple[500]}
            borderRadius="lg"
            p={6}
            borderWidth="2px"
            borderColor={colors.walnut_brown[600]}
          >
            <Heading size="md" color={colors.xanthous.DEFAULT} mb={4}>
              Le tue impostazioni
            </Heading>

            <DinosaurSelector
              selectedDinosaur={selectedDinosaur}
              onSelect={handleChangeDinosaur}
              isDisabled={isReady}
            />

            <Divider my={4} borderColor={colors.walnut_brown[600]} />

            <ReadyButton
              isReady={isReady}
              onToggleReady={handleToggleReady}
            />

            <Divider my={4} borderColor={colors.walnut_brown[600]} />

            <Button
              width="100%"
              bg={colors.bittersweet.DEFAULT}
              color={colors.primaryText}
              _hover={{ bg: colors.bittersweet[600] }}
              onClick={handleLeaveLobby}
            >
              Abbandona Lobby
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

LobbyDetailPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default LobbyDetailPage;
