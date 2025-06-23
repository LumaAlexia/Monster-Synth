import {
	Flex,
	Heading,
	Image,
	Link as ChakraLink,
	Stack,
	Menu,
	Avatar,
	Skeleton,
	Portal,
	Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { colors } from "../theme/colors";
import { useSession } from "next-auth/react";

const NavBar = () => {
	const { data: session, status } = useSession();

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding={{ base: 4, md: 6 }}
			bg={colors.dark_purple[500]}
			borderBottom="2px solid"
			borderColor={colors.xanthous.DEFAULT}
			w="100%"
		>
			<Flex align="center" mr={5}>
				<ChakraLink
					as={NextLink}
					href="/home"
					_hover={{ textDecoration: "none" }}
				>
					<Image
						src="/logo.png"
						alt="Happy Little Dinosaurs Logo"
						boxSize={{ base: "60px", md: "70px" }}
					/>
				</ChakraLink>
				<Heading
					as="h1"
					size={{ base: "xl", md: "2xl" }}
					ml={3}
					fontWeight="bold"
					color={colors.primaryText}
				>
					Happy Little Dinosaurs
				</Heading>
			</Flex>

			<Stack
				direction={{ base: "column", md: "row" }}
				gap={{ base: 8, md: 12 }}
				alignItems={{ base: "flex-start", md: "center" }}
			>
				<ChakraLink
					as={NextLink}
					href="/rules"
					color={colors.primaryText}
					_hover={{
						color: colors.bright_dino_green.DEFAULT,
						transform: "scale(1.1)",
						transition: "transform 0.2s ease-in-out",
					}}
					fontSize={{ base: "lg", md: "xl" }}
					fontWeight="medium"
				>
					Regole
				</ChakraLink>
				<ChakraLink
					as={NextLink}
					href="/support-us"
					color={colors.primaryText}
					_hover={{
						color: colors.bright_dino_green.DEFAULT,
						transform: "scale(1.1)",
						transition: "transform 0.2s ease-in-out",
					}}
					fontSize={{ base: "lg", md: "xl" }}
					fontWeight="medium"
				>
					Supportaci
				</ChakraLink>
				{status != "unauthenticated" ? (
					<Menu.Root>
						<Menu.Trigger asChild mr={5}>
							{status == "loading" ? (
								<Skeleton
									borderRadius="xl"
									w={"55px"}
									h={"55px"}
								/>
							) : (
								<Button w={"58px"} h={"58px"} p={0}>
									<Avatar.Root
										shape="rounded"
										w={"55px"}
										h={"55px"}
									>
										<Avatar.Fallback
											name={session!.user!.name || ""}
										/>
										<Avatar.Image
											src={session!.user!.image || ""}
										/>
									</Avatar.Root>
								</Button>
							)}
						</Menu.Trigger>
						<Portal>
							<Menu.Positioner>
								<Menu.Content
									backgroundColor={
										colors.walnut_brown.DEFAULT
									}
								>
									<Menu.Item value="profile">
										<ChakraLink
											as={NextLink}
											href="/user/profile"
											color={colors.primaryText}
											_hover={{
												color: colors.bright_dino_green
													.DEFAULT,
												transform: "scale(1.1)",
												transition:
													"transform 0.2s ease-in-out",
											}}
											fontSize={{ base: "lg", md: "xl" }}
											fontWeight="medium"
										>
											Profilo
										</ChakraLink>
									</Menu.Item>
									<Menu.Item value="lobby">
										<ChakraLink
											as={NextLink}
											href="/lobby"
											color={colors.primaryText}
											_hover={{
												color: colors.bright_dino_green
													.DEFAULT,
												transform: "scale(1.1)",
												transition:
													"transform 0.2s ease-in-out",
											}}
											fontSize={{ base: "lg", md: "xl" }}
											fontWeight="medium"
										>
											Lobby
										</ChakraLink>
									</Menu.Item>
									<Menu.Separator />
									<Menu.Item
										value="logout"
										color={colors.bittersweet.DEFAULT}
									>
										<ChakraLink
											as={NextLink}
											href="/api/auth/signout"
											color={colors.bittersweet.DEFAULT}
											_hover={{
												color: colors.bittersweet
													.DEFAULT,
												transform: "scale(1.1)",
												transition:
													"transform 0.2s ease-in-out",
											}}
											fontSize={{ base: "lg", md: "xl" }}
											fontWeight="medium"
										>
											Logout
										</ChakraLink>
									</Menu.Item>
								</Menu.Content>
							</Menu.Positioner>
						</Portal>
					</Menu.Root>
				) : (
					<ChakraLink
						as={NextLink}
						href="/api/auth/signin"
						color={colors.primaryText}
						_hover={{
							color: colors.bright_dino_green.DEFAULT,
							transform: "scale(1.1)",
							transition: "transform 0.2s ease-in-out",
						}}
						fontSize={{ base: "lg", md: "xl" }}
						fontWeight="medium"
					>
						Accedi
					</ChakraLink>
				)}
			</Stack>
		</Flex>
	);
};

export default NavBar;
