import {
	Box,
	Button,
	Container,
	Heading,
	Text,
	VStack,
	Image,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { NextPageWithLayout } from "@/pages/_app";
import AppLayout from "@/components/layout/AppLayout";
import { useSession } from "next-auth/react";

const MonsterPage: NextPageWithLayout = () => {
	const { data: session, status } = useSession();

	return (
		<Container
			maxW="container.xl"
			py={{ base: 8, md: 12 }}
			px={{ base: 4, md: 6 }}
			textAlign="center"
		>
			<VStack gap={8}>
				{status === "loading" ? (
					<Box>Loading...</Box>
				) : status === "unauthenticated" ? (
					<>
						<Heading as="h1" size="4xl" color="primary">
							Welcome to Monster Synth!
						</Heading>
						<Text fontSize="xl" maxW="2xl" mx="auto">
							Unleash your creativity and bring your own musical
							monster to life. Compose unique melodies and watch
							your monster dance to your tunes.
						</Text>
						<NextLink href="/auth/signin" passHref>
							<Button
								as="a"
								bg="primary"
								size="lg"
								_hover={{ bg: "indigo.600" }}
							>
								Start Creating
							</Button>
						</NextLink>
						<Image
							src="/assets/banner.png"
							alt="Monster Synth Banner"
						/>
					</>
				) : (
					<>
						<Heading as="h1" size="3xl">
							Welcome back, {session!.user!.name}!
						</Heading>
						<Text fontSize="lg">
							Ready to make some noise? Jump back into your studio
							and continue creating your masterpiece.
						</Text>
						<NextLink href="/dashboard" passHref>
							<Button
								as="a"
								bg="primary"
								size="lg"
								_hover={{ bg: "indigo.600" }}
							>
								Go to Dashboard
							</Button>
						</NextLink>
					</>
				)}
			</VStack>
		</Container>
	);
};

MonsterPage.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>;
};
export default MonsterPage;
