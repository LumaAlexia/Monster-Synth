import {
	Box,
	Flex,
	HStack,
	IconButton,
	useDisclosure,
	Stack,
	Avatar,
	Menu,
	Button,
	Link as ChakraLink,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { MdAdfScanner, MdClose } from "react-icons/md";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const NavLink = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => (
	<ChakraLink
		as={NextLink}
		href={href}
		px={2}
		py={1}
		rounded={"md"}
		color="whiteAlpha.800"
		_hover={{
			textDecoration: "none",
			bg: "whiteAlpha.200",
			color: "white",
		}}
	>
		{children}
	</ChakraLink>
);

export default function NavBar() {
	const { open, onOpen, onClose } = useDisclosure();
	const { data: session } = useSession();
	const { t } = useTranslation("common");

	const navLinks = [
		{ name: t("nav.features"), href: "/#features" },
		{ name: t("nav.monster"), href: "/user/monster" },
	];

	return (
		<MotionBox
			bg="linear-gradient(135deg, #4c1d95, #be185d, #f97316)"
			px={4}
			shadow="xl"
			position="relative"
			zIndex="banner"
			backgroundSize="200% 200%"
			animate={{
				backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
			}}
			transition={{
				duration: 10,
				ease: "easeInOut",
				repeat: Infinity,
			}}
		>
			<Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
				<IconButton
					size={"md"}
					aria-label={"Open Menu"}
					display={{ md: "none" }}
					onClick={open ? onClose : onOpen}
					bg="transparent"
					color="white"
					_hover={{ bg: "whiteAlpha.300" }}
				>
					{open ? <MdClose /> : <MdAdfScanner />}
				</IconButton>
				<HStack gap={8} alignItems={"center"}>
					<ChakraLink
						as={NextLink}
						href="/home"
						color="white"
						fontWeight="bold"
						fontSize="xl"
					>
						Monster Synth
					</ChakraLink>
					<HStack gap={4} display={{ base: "none", md: "flex" }}>
						{navLinks.map((link) => (
							<NavLink key={link.href} href={link.href}>
								{link.name}
							</NavLink>
						))}
					</HStack>
				</HStack>
				<Flex alignItems={"center"}>
					<LanguageSwitcher />
					{session ? (
						<Menu.Root>
							<Menu.Trigger asChild>
								<Button
									rounded={"full"}
									variant={"ghost"}
									cursor={"pointer"}
									minW={0}
								>
									<Avatar.Root size={"sm"}>
										<Avatar.Image
											src={
												session.user?.image || undefined
											}
										/>
										<Avatar.Fallback />
									</Avatar.Root>
								</Button>
							</Menu.Trigger>
							<Menu.Positioner>
								<Menu.Content
									bg="gray.800"
									borderColor="gray.700"
								>
									<Menu.Item
										as={NextLink}
										href="/user/profile"
									>
										{t("nav.profile")}
									</Menu.Item>
									<Menu.Item
										as={NextLink}
										href="/user/settings"
									>
										{t("nav.settings")}
									</Menu.Item>
									<Menu.Separator borderColor="gray.700" />
									<Menu.Item
										onClick={() => signOut()}
										bg="gray.800"
										_hover={{ bg: "purple.700" }}
										value="logout"
									>
										{t("nav.logout")}
									</Menu.Item>
								</Menu.Content>
							</Menu.Positioner>
						</Menu.Root>
					) : (
						<Button
							as={NextLink}
							href="/auth/signin"
							variant="solid"
							bg="orange.500"
							color="white"
							_hover={{
								bg: "orange.600",
								textDecoration: "none",
							}}
							ml={4}
						>
							{t("nav.signin")}
						</Button>
					)}
				</Flex>
			</Flex>

			{open ? (
				<Box pb={4} display={{ md: "none" }}>
					<Stack as={"nav"} gap={4}>
						{navLinks.map((link) => (
							<NavLink key={link.href} href={link.href}>
								{link.name}
							</NavLink>
						))}
					</Stack>
				</Box>
			) : null}
		</MotionBox>
	);
}
