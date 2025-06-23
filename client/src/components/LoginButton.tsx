import { Box, Button, Heading } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
	const { data: session } = useSession();
	if (session) {
		return (
			<Box>
				<Heading as="h2" size="xl" mb={4}>
					Signed in as {session!.user!.name}
				</Heading>
				<Button onClick={() => signOut()}>Sign out</Button>
			</Box>
		);
	}
	return (
		<Box>
			<Heading as="h2" size="xl" mb={4}>
				Not signed in
			</Heading>
			<Button onClick={() => signIn()}>Sign in</Button>
		</Box>
	);
}
