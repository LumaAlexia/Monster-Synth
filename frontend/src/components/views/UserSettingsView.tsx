import { Text, Heading, Container } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { colors } from "../../theme/colors";

export const UserSettingsView = () => {
	const { t } = useTranslation("translation", { useSuspense: false });

	return (
		<Container
			maxW="container.xl"
			py={{ base: 8, md: 12 }}
			px={{ base: 4, md: 6 }}
		>
			<Heading as="h1" size="2xl" color={colors.primaryText} mb={8}>
				{t("settings.pageTitle")}
			</Heading>
			<Text color={colors.primaryText}>{t("settings.title")}</Text>
		</Container>
	);
};
