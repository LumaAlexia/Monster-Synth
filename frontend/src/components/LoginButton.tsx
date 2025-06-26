import { Box, Button, Heading } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";

export default function LoginButton() {
	const { data: session } = useSession();
	const { t } = useTranslation("translation", { useSuspense: false });

	if (session) {
		return (
			<Box>
				<Heading as="h2" size="xl" mb={4}>
					{t("common.signedInAs")} {session!.user!.name}
				</Heading>
				<Button onClick={() => signOut()}>{t("common.signOut")}</Button>
			</Box>
		);
	}
	return (
		<Box>
			<Heading as="h2" size="xl" mb={4}>
				{t("common.notSignedIn")}
			</Heading>
			<Button onClick={() => signIn()}>{t("common.signIn")}</Button>
		</Box>
	);
}
