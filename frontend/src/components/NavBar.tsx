import {
	Box,
	Flex,
	HStack,
	Avatar,
	Menu,
	Button,
	Link as ChakraLink,
	Icon,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion } from "framer-motion";
import Link from "next/link";
import { GiMonsterGrasp } from "react-icons/gi";
import { colors } from "@/theme/colors";

const MotionBox = motion.create(Box);

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
		px={3}
		py={2}
		rounded={"md"}
		color="whiteAlpha.800"
		fontSize={"lg"}
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
	const { data: session } = useSession();
	const { t } = useTranslation("translation", { useSuspense: false });

	const navLinks = [
		{ name: t("nav.features"), href: "/#features" },
		{ name: t("nav.monster"), href: "/user/monster" },
		{ name: t("nav.feedback"), href: "/feedback" },
	];

	return (
		<MotionBox
			className="secondary-gradient"
			px={8}
			shadow="xl"
			backgroundSize="200% 200%"
			animate={{
				backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
			}}
			transition={{
				duration: 10,
				ease: "easeInOut",
				repeat: Infinity,
			}}
			borderRadius={"3xl"}
			border="8px double white"
		>
			<Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
				<HStack gap={8} alignItems={"center"}>
					<Icon
						as={GiMonsterGrasp}
						w={10}
						h={10}
						color={colors.indigo[900]}
						className="glow-strong"
					/>
					<ChakraLink
						as={NextLink}
						href="/home"
						color="white"
						fontWeight="bold"
						fontSize="2xl"
					>
						Monster Synth
					</ChakraLink>
					<HStack gap={6} display={{ base: "none", md: "flex" }}>
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
									p={1}
									ml={4}
									_hover={{
										bg: "whiteAlpha.200",
										transform: "scale(1.05)",
									}}
									_active={{
										bg: "whiteAlpha.300",
										transform: "scale(0.98)",
									}}
									transition="all 0.2s"
								>
									<Avatar.Root size={"2xl"}>
										<Avatar.Image
											src={
												session.user?.image || undefined
											}
										/>
										<Avatar.Fallback
											bg={colors.egyptian_blue[500]}
											color="white"
										/>
									</Avatar.Root>
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
									<Menu.Item
										asChild
										value={t("nav.profile")}
										color={colors.primaryText}
										_hover={{
											bg: colors.egyptian_blue[400],
											color: colors.orange[400],
										}}
										_active={{
											bg: colors.egyptian_blue[500],
											color: colors.orange[300],
										}}
										fontSize="md"
										py={3}
									>
										<Link href="/user/profile">
											{t("nav.profile")}
										</Link>
									</Menu.Item>
									<Menu.Item
										asChild
										value={t("nav.settings")}
										color={colors.primaryText}
										_hover={{
											bg: colors.egyptian_blue[400],
											color: colors.orange[400],
										}}
										_active={{
											bg: colors.egyptian_blue[500],
											color: colors.orange[300],
										}}
										fontSize="md"
										py={3}
									>
										<Link href="/user/settings">
											{t("nav.settings")}
										</Link>
									</Menu.Item>
									<Menu.Separator
										borderColor={colors.egyptian_blue[400]}
									/>
									<Menu.Item
										onClick={() => signOut()}
										color={colors.primaryText}
										_hover={{
											bg: colors.blush[500],
											color: "white",
										}}
										_active={{
											bg: colors.blush[600],
											color: "white",
										}}
										value="logout"
										fontSize="md"
										py={3}
									>
										{t("nav.logout")}
									</Menu.Item>
								</Menu.Content>
							</Menu.Positioner>
						</Menu.Root>
					) : (
						<Button
							asChild
							variant="solid"
							bg="orange.500"
							color="white"
							_hover={{
								bg: "orange.600",
								textDecoration: "none",
							}}
							ml={4}
							size={"lg"}
						>
							<Link href="/auth/signin">{t("nav.signin")}</Link>
						</Button>
					)}
				</Flex>
			</Flex>
		</MotionBox>
	);
}
