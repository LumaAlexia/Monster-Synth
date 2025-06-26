import { Box, Button, Menu, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { colors } from "../theme/colors";

const LanguageSwitcher = () => {
	const { i18n } = useTranslation("translation", { useSuspense: false });
	const [isChanging, setIsChanging] = useState(false);

	const languages = [
		{ code: "en", label: "English", flag: "🇺🇸" },
		{ code: "it", label: "Italiano", flag: "🇮🇹" },
		{ code: "es", label: "Español", flag: "🇪🇸" },
		{ code: "de", label: "Deutsch", flag: "🇩🇪" },
	];

	const currentLanguage =
		languages.find((lang) => lang.code === i18n.language) || languages[0];

	const changeLanguage = async (locale: string) => {
		if (locale === i18n.language || isChanging) return;

		setIsChanging(true);
		await i18n.changeLanguage(locale);
		setIsChanging(false);
	};

	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button
					variant="ghost"
					px={3}
					py={2}
					rounded="md"
					color="whiteAlpha.800"
					fontSize="lg"
					_hover={{
						textDecoration: "none",
						bg: "whiteAlpha.200",
						color: "white",
					}}
					_active={{
						bg: "whiteAlpha.300",
						color: "white",
					}}
					loading={isChanging}
					minW="auto"
				>
					<HStack gap={2}>
						<Box fontSize="2xl">{currentLanguage.flag}</Box>
						<FaGlobe />
					</HStack>
				</Button>
			</Menu.Trigger>
			<Menu.Positioner>
				<Menu.Content
					bg={colors.egyptian_blue[200]}
					borderColor={colors.egyptian_blue[400]}
					borderWidth="1px"
					backdropFilter="blur(10px)"
					boxShadow="xl"
					rounded="lg"
				>
					{languages.map((language) => (
						<Menu.Item
							key={language.code}
							value={language.code}
							onClick={() => changeLanguage(language.code)}
							bg="transparent"
							color={
								i18n.language === language.code
									? colors.orange[500]
									: colors.primaryText
							}
							_hover={{
								bg: colors.egyptian_blue[400],
								color: colors.orange[400],
							}}
							_active={{
								bg: colors.egyptian_blue[500],
								color: colors.orange[300],
							}}
							fontWeight={
								i18n.language === language.code
									? "bold"
									: "normal"
							}
							fontSize="md"
							py={3}
						>
							<HStack gap={3}>
								<Text fontSize="lg">{language.flag}</Text>
								<Text>{language.label}</Text>
							</HStack>
						</Menu.Item>
					))}
				</Menu.Content>
			</Menu.Positioner>
		</Menu.Root>
	);
};

export default LanguageSwitcher;
