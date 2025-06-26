import { Box, Container, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";
import { AccordionItem } from "../AccordionItem";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";
import { getFAQData } from "../../config/faq";

interface HomeFAQViewProps {
	openFaq: number;
	setOpenFaq: (index: number) => void;
}

export const HomeFAQView = ({ openFaq, setOpenFaq }: HomeFAQViewProps) => {
	const { t } = useTranslation("translation", { useSuspense: false });

	const faqData = getFAQData(t);

	return (
		<Box position="relative" zIndex={1} py={20} bg="#1a1a2e">
			<Container maxW="container.xl">
				<VStack gap={12}>
					<VStack gap={4} textAlign="center">
						<Icon
							as={FaQuestionCircle}
							w={16}
							h={16}
							color={colors.orange[500]}
						/>
						<Heading
							as="h2"
							size="2xl"
							color={colors.primaryText}
							fontWeight="bold"
						>
							{t("faq.title")}
						</Heading>
						<Text
							fontSize="lg"
							maxW="2xl"
							color={colors.primaryText}
							opacity={0.8}
						>
							{t("faq.subtitle")}
						</Text>
					</VStack>

					<Box maxW="4xl" w="full">
						{faqData.map((faq, index) => (
							<AccordionItem
								key={index}
								title={faq.question}
								content={faq.answer}
								isOpen={openFaq === index}
								onToggle={() =>
									setOpenFaq(openFaq === index ? -1 : index)
								}
								variant="faq"
							/>
						))}
					</Box>
				</VStack>
			</Container>
		</Box>
	);
};
