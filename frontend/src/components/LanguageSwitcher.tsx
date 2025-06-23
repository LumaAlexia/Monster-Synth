import { Box, Button, Menu, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { colors } from "../theme/colors";

const LanguageSwitcher = () => {
	const router = useRouter();
	const [isChanging, setIsChanging] = useState(false);

	const languages = [
		{ code: "en", label: "English", flag: "🇺🇸" },
		{ code: "it", label: "Italiano", flag: "🇮🇹" },
		{ code: "de", label: "Deutsch", flag: "🇩🇪" },
	];

	const currentLanguage =
		languages.find((lang) => lang.code === router.locale) || languages[0];

	const changeLanguage = async (locale: string) => {
		if (locale === router.locale || isChanging) return;

		setIsChanging(true);
		await router.push(router.asPath, router.asPath, { locale });
		setIsChanging(false);
	};

	return (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button
					variant="ghost"
					size="sm"
					color={colors.primaryText}
					_hover={{
						bg: colors.egyptian_blue[600],
						color: colors.orange[500],
					}}
					loading={isChanging}
					borderRadius="lg"
					p={3}
				>
					<HStack gap={2}>
						<Box fontSize="lg">{currentLanguage.flag}</Box>
						<FaGlobe />
					</HStack>
				</Button>
			</Menu.Trigger>
			<Menu.Positioner>
				<Menu.Content
					bg={colors.egyptian_blue[500]}
					borderColor={colors.orange[500]}
				>
					{languages.map((language) => (
						<Menu.Item
							key={language.code}
							value={language.code}
							onClick={() => changeLanguage(language.code)}
							color={
								router.locale === language.code
									? colors.orange[500]
									: colors.primaryText
							}
							_hover={{
								bg: colors.egyptian_blue[600],
								color: colors.orange[500],
							}}
							fontWeight={
								router.locale === language.code
									? "bold"
									: "normal"
							}
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
