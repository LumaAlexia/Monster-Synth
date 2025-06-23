import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "../_app";
import {
	Avatar,
	Box,
	Container,
	Heading,
	HStack,
	Separator,
	VStack,
} from "@chakra-ui/react";
import { colors } from "@/theme/colors";
import { useSession } from "next-auth/react";

const ProfilePage: NextPageWithLayout = () => {
	const { data: session, status } = useSession();
	console.log("Session data:", session);

	return (
		<Container
			maxW="container.xl"
			py={{ base: 8, md: 12 }}
			px={{ base: 4, md: 6 }}
		>
			<VStack>
				{status === "loading" ? (
					<Box>Loading...</Box>
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
								Bentornato,
							</Heading>
							<HStack>
								<Heading
									as="h1"
									size={{ base: "4xl", md: "5xl" }}
									fontWeight="bold"
									color={colors.bright_dino_green.DEFAULT}
								>
									{session?.user?.name}
								</Heading>
								{ /* edit name logic here */} 
							</HStack>
							<Box
								fontSize={{ base: "xl", md: "2xl" }}
								color={colors.primaryText}
							>
								Statistiche:
							</Box>
							<Box>
								<Box
									fontSize={{ base: "lg", md: "xl" }}
									color={colors.walnut_brown.DEFAULT}
								>
									Partite giocate: {session?.user.totalGames}
								</Box>
								<Box
									fontSize={{ base: "lg", md: "xl" }}
									color={colors.walnut_brown.DEFAULT}
								>
									Vittorie: {session?.user?.totalWins}
								</Box>
								<Box
									fontSize={{ base: "lg", md: "xl" }}
									color={colors.walnut_brown.DEFAULT}
								>
									Podi Raggiunti:{" "}
									{session?.user?.podiumPlacements}
								</Box>
							</Box>
						</VStack>
					</HStack>
				)}
			</VStack>
		</Container>
	);
};

ProfilePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;
export default ProfilePage;
