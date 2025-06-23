import { signOut } from "next-auth/react";
import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "@/pages/_app";
import {
	Button,
	Heading,
	Text,
	Box,
	VStack,
	Spinner,
	Center,
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const SignOutPage: NextPageWithLayout = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/" });
	};

	if (status === "loading") {
		return (
			<Center minH="calc(100vh - 100px)">
				<Spinner size="xl" color={colors.xanthous.DEFAULT} />
			</Center>
		);
	}

	if (status === "unauthenticated" || !session) {
		return (
			<Center minH="calc(100vh - 100px)">
				<Text color={colors.primaryText}>
					Verrai reindirizzato alla pagina di login...
				</Text>
			</Center>
		);
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			minHeight="calc(100vh - 100px)"
			px="20px"
			py={10}
			bg={colors.dark_purple.DEFAULT}
			color={colors.primaryText}
		>
			<Heading
				size={"2xl"}
				mb={6}
				color={colors.xanthous.DEFAULT}
				textAlign="center"
			>
				Sei sicuro di voler uscire?
			</Heading>
			<Text mb={8} color={colors.primaryText} textAlign="center">
				Cliccando su &quot;Esci&quot; verrai disconnesso dal tuo
				account.
			</Text>
			<VStack gap={4} width={{ base: "90%", md: "450px" }}>
				<Button
					onClick={handleSignOut}
					bg={colors.bittersweet.DEFAULT} // Un colore che suggerisce un'azione di "uscita" o "attenzione"
					color={colors.primaryText}
					width="100%"
					py={6} // Aumentato il padding per un pulsante più grande
					fontSize="lg"
					_hover={{
						bg: colors.bittersweet[600],
					}}
					_active={{
						bg: colors.bittersweet[700],
					}}
				>
					Esci
				</Button>
				<Button
					onClick={() => router.push("/home")} // Pulsante per tornare indietro o annullare
					variant="outline"
					borderColor={colors.xanthous.DEFAULT}
					color={colors.xanthous.DEFAULT}
					width="100%"
					py={6}
					fontSize="lg"
					_hover={{
						bg: `${colors.xanthous.DEFAULT}20`, // Sfondo leggermente colorato al hover
					}}
				>
					Annulla
				</Button>
			</VStack>
		</Box>
	);
};

SignOutPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default SignOutPage;
