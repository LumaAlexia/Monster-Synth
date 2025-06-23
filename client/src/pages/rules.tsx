import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { colors } from "../theme/colors";
import { useState } from "react";
import AppLayout from "../components/layout/AppLayout"; // Importa AppLayout
import { NextPageWithLayout } from "./_app";
import { rulesSections } from "@/config/rules";
import { AccordionItem } from "@/components/AccordionItem";

const RulesPage: NextPageWithLayout = () => {
	const [openSections, setOpenSections] = useState<string[]>(["intro"]);

	const toggleSection = (sectionId: string) => {
		setOpenSections((prevOpenSections) =>
			prevOpenSections.includes(sectionId)
				? prevOpenSections.filter((id) => id !== sectionId)
				: [...prevOpenSections, sectionId]
		);
	};

	return (
		<>
			<Head>
				<title>Happy Little Dinosaurs - Regole del Gioco</title>
				<meta
					name="description"
					content="Impara a giocare a Happy Little Dinosaurs!"
				/>
				<link rel="icon" href="/logo.png" />
			</Head>

			{/* Content Section - NavBar e Footer sono gestiti da AppLayout */}
			<Container
				maxW="container.lg"
				py={{ base: 8, md: 12 }}
				px={{ base: 4, md: 6 }}
			>
				<VStack gap={8} align="stretch">
					<Heading
						as="h2"
						size={{ base: "xl", md: "2xl" }}
						textAlign="center"
						color={colors.bright_dino_green.DEFAULT}
						mb={6}
						textShadow="1px 1px 2px rgba(0,0,0,0.5)"
					>
						Regole di Happy Little Dinosaurs
					</Heading>

					<Box>
						{rulesSections.map((section) => (
							<AccordionItem
								key={section.id}
								section={section}
								isOpen={openSections.includes(section.id)}
								onToggle={() => toggleSection(section.id)}
							/>
						))}
					</Box>
				</VStack>
			</Container>
		</>
	);
};

RulesPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default RulesPage;
