import {
	Box,
	Button,
	ButtonGroup,
	Container,
	Grid,
	GridItem,
	Heading,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { colors } from "../theme/colors";
import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout";
import { NextPageWithLayout } from "./_app";

const MotionBox = motion.create(Box);

const HomePage: NextPageWithLayout = () => {
	return (
		<>
			<Container
				maxW="container.xl"
				py={{ base: 8, md: 12 }}
				px={{ base: 4, md: 6 }}
			>
				{" "}
				<VStack gap={8} textAlign="center" mb={{ base: 10, md: 16 }}>
					<MotionBox
						whileHover={{ scale: 1.1, rotate: -5 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<Image
							src="/logo.png"
							alt="Happy Little Dinosaurs Main Graphic"
							boxSize={{ base: "100px", md: "150px" }}
						/>
					</MotionBox>
					<Heading
						as="h2"
						size={{ base: "2xl", md: "3xl" }}
						fontWeight="bold"
						color={colors.bright_dino_green.DEFAULT}
						textShadow="2px 2px 3px rgba(0,0,0,0.6)"
					>
						Benvenuto in Happy Little Dinosaurs!
					</Heading>
					<Text
						fontSize={{ base: "lg", md: "xl" }}
						maxW="2xl"
						color={colors.primaryText}
						lineHeight="tall"
					>
						Un gioco esilarante dove cerchi di evitare disastri... o
						almeno di essere l&apos;ultimo dinosauro a soccombere!
						Preparati a ridere delle sfortune altrui (e delle tue)
						in questa avventura preistorica piena di imprevisti.
					</Text>
					<ButtonGroup gap={6} mt={8}>
						<Button
							as={NextLink}
							href="/lobby"
							size="lg"
							bg={colors.bright_dino_green.DEFAULT}
							color={colors.dark_purple.DEFAULT}
							_hover={{
								bg: colors.bright_dino_green[600],
								transform: "translateY(-2px)",
							}}
							boxShadow="lg"
						>
							Gioca Ora
						</Button>
						<Button
							as={NextLink}
							href="/rules"
							size="lg"
							variant="outline"
							borderColor={colors.xanthous.DEFAULT}
							color={colors.xanthous.DEFAULT}
							_hover={{
								bg: colors.xanthous.DEFAULT,
								color: colors.dark_purple.DEFAULT,
								transform: "translateY(-2px)",
							}}
							boxShadow="md"
						>
							Leggi le Regole
						</Button>
					</ButtonGroup>
				</VStack>
				<Grid
					templateColumns={{ base: "1fr", md: "1fr 1fr" }}
					gap={{ base: 6, md: 12 }}
					alignItems="center"
					mb={{ base: 10, md: 16 }}
				>
					<GridItem>
						<VStack
							gap={4}
							align={{ base: "center", md: "flex-start" }}
							textAlign={{ base: "center", md: "left" }}
						>
							<Heading
								as="h3"
								size="xl"
								color={colors.xanthous.DEFAULT}
							>
								Sopravvivi con Stile!
							</Heading>
							<Text fontSize="lg" color={colors.primaryText}>
								Colleziona punti, schiva meteore e cerca di non
								essere divorato! Ogni carta è una nuova sfida o
								una divertente (per gli altri) catastrofe.
								Guarda come i dinosauri affrontano i pericoli
								quotidiani della preistoria.
							</Text>
						</VStack>
					</GridItem>
					<GridItem>
						<Box
							bg={colors.dark_purple[400]}
							p={4}
							borderRadius="lg"
							boxShadow="xl"
							border="2px solid"
							borderColor={colors.walnut_brown.DEFAULT}
						>
							<Image
								src="/images/hld_screenshot_1.png"
								alt="Screenshot del gioco Happy Little Dinosaurs"
								borderRadius="md"
							/>
						</Box>
					</GridItem>
				</Grid>
				<Grid
					templateColumns={{ base: "1fr", md: "1fr 1fr" }}
					gap={{ base: 6, md: 12 }}
					alignItems="center"
				>
					<GridItem order={{ base: 2, md: 1 }}>
						<Box
							bg={colors.dark_purple[400]}
							p={4}
							borderRadius="lg"
							boxShadow="xl"
							border="2px solid"
							borderColor={colors.bright_dino_green.DEFAULT}
						>
							<Image
								src="/images/hld_screenshot_2.png"
								alt="Altro screenshot del gioco Happy Little Dinosaurs"
								borderRadius="md"
							/>
						</Box>
					</GridItem>
					<GridItem order={{ base: 1, md: 2 }}>
						<VStack
							gap={4}
							align={{ base: "center", md: "flex-start" }}
							textAlign={{ base: "center", md: "left" }}
						>
							<Heading
								as="h3"
								size="xl"
								color={colors.xanthous.DEFAULT}
							>
								Disastri dietro l&apos;Angolo!
							</Heading>
							<Text fontSize="lg" color={colors.primaryText}>
								Tra carte Disastro naturali, predatorie ed
								emozionali, la vita del tuo dinosauro non sarà
								mai noiosa. Riuscirai a essere l&apos;ultimo a
								rimanere in piedi o il primo a raggiungere 50
								punti?
							</Text>
						</VStack>
					</GridItem>
				</Grid>
			</Container>
		</>
	);
};

// Aggiungi la funzione getLayout
HomePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default HomePage;
