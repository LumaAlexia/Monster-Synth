import {
	Box,
	Button,
	Container,
	Heading,
	Icon,
	Text,
	VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { colors } from "../theme/colors";
import { FaCoffee } from "react-icons/fa";
import { motion } from "framer-motion";
import AppLayout from "../components/layout/AppLayout"; // Importa AppLayout
import { Link as ChakraLink } from "@chakra-ui/react"; // Necessario per il MotionButton as ChakraLink
import { NextPageWithLayout } from "@/pages/_app";

const MotionButton = motion.create(Button);
const MotionBox = motion.create(Box);

const SupportUsPage: NextPageWithLayout = () => {
	const buyMeACoffeeLink = "https://www.buymeacoffee.com/alpharyzedev";

	return (
		<>
			<Head>
				<title>Happy Little Dinosaurs - Supportaci</title>
				<meta
					name="description"
					content="Offrici un caffè e supporta Happy Little Dinosaurs!"
				/>
				<link rel="icon" href="/logo.png" />
			</Head>

			{/* Content Section - NavBar e Footer sono gestiti da AppLayout */}
			<Container
				maxW="container.md"
				py={{ base: 10, md: 16 }}
				px={{ base: 4, md: 6 }}
				textAlign="center"
			>
				{" "}
				{/* Ridotto py per possibile bordo bianco */}
				<VStack gap={8}>
					<MotionBox
						whileHover={{ scale: 1.2, rotate: 10 }}
						transition={{ type: "spring", stiffness: 200 }}
					>
						<Icon
							as={FaCoffee}
							w={{ base: 20, md: 24 }}
							h={{ base: 20, md: 24 }}
							color={colors.xanthous.DEFAULT}
						/>
					</MotionBox>
					<Heading
						as="h2"
						size={{ base: "xl", md: "2xl" }}
						color={colors.bright_dino_green.DEFAULT}
						textShadow="1px 1px 2px rgba(0,0,0,0.5)"
					>
						Ti piacciono i nostri Dinosauri?
					</Heading>
					<Text
						fontSize={{ base: "lg", md: "xl" }}
						color={colors.primaryText}
						maxW="lg"
						mx="auto"
						lineHeight="tall"
					>
						Se ti stai divertendo con Happy Little Dinosaurs e vuoi
						aiutarci a far crescere il gioco, considera di offrirci
						un caffè! Ogni contributo, grande o piccolo, ci aiuta a
						creare nuove avventure, funzionalità e a mantenere i
						server attivi (se applicabile).
					</Text>
					<MotionButton
						as={ChakraLink} // Usa ChakraLink per link esterni
						href={buyMeACoffeeLink}
						isExternal
						size="lg"
						bg={colors.xanthous.DEFAULT}
						color={colors.dark_purple.DEFAULT}
						_hover={{
							bg: colors.xanthous[600],
							transform: "translateY(-3px) scale(1.05)",
						}}
						boxShadow="xl"
						leftIcon={<Icon as={FaCoffee} />}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						fontWeight="bold"
					>
						Offrici un Caffè
					</MotionButton>
					<Text fontSize="sm" color={colors.walnut_brown[600]}>
						Sarai reindirizzato a Buy Me a Coffee.
					</Text>
				</VStack>
			</Container>
		</>
	);
};

SupportUsPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default SupportUsPage;
