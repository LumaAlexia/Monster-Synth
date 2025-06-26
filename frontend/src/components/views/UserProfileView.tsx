import {
	Avatar,
	Box,
	Container,
	Heading,
	HStack,
	Separator,
	VStack,
} from "@chakra-ui/react";
import { colors } from "../../theme/colors";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

export const UserProfileView = () => {
	const { data: session, status } = useSession();
	const { t } = useTranslation("translation", { useSuspense: false });

	return (
		<Container
			maxW="container.xl"
			py={{ base: 8, md: 12 }}
			px={{ base: 4, md: 6 }}
		>
			<VStack>
				{status === "loading" ? (
					<Box>{t("common.loading")}</Box>
				) : (
					<HStack>
						<Avatar.Root
							shape="rounded"
							w={"250px"}
							h={"250px"}
							rounded={"3xl"}
						>
							<Avatar.Fallback name={session!.user!.name || ""} />
							<Avatar.Image src={session!.user!.image || ""} />
						</Avatar.Root>
						<Separator w={"60px"} orientation="vertical" />
						<VStack alignItems="flex-start" gap={4}>
							<Heading
								as="h1"
								size={{ base: "4xl", md: "5xl" }}
								fontWeight="bold"
								color={colors.primaryText}
								lineHeight={0.2}
							>
								{t("common.welcomeBack")},
							</Heading>
							<HStack>
								<Heading
									as="h1"
									size={{ base: "4xl", md: "5xl" }}
									fontWeight="bold"
									color={colors.blush[500]}
								>
									{session?.user?.name}
								</Heading>
							</HStack>
							<Box
								fontSize={{ base: "xl", md: "2xl" }}
								color={colors.primaryText}
							>
								{t("common.statistics")}
							</Box>
						</VStack>
					</HStack>
				)}
			</VStack>
		</Container>
	);
};
