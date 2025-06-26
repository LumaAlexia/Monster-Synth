import { Box, Flex, VStack, Text, Spinner } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../NavBar";
import { colors } from "../../theme/colors";

interface AppLayoutProps {
	children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
	const { ready } = useTranslation("translation", { useSuspense: false });

	// Show loading spinner while translations are loading
	if (!ready) {
		return (
			<Box minH="100vh" className="main-gradient">
				<Flex align="center" justify="center" minH="100vh">
					<VStack gap={6}>
						<Spinner size="xl" color={colors.orange[500]} />
						<Text
							color={colors.primaryText}
							fontSize="lg"
							fontWeight="medium"
							className="pulse-slow"
						>
							Loading...
						</Text>
					</VStack>
				</Flex>
			</Box>
		);
	}

	return (
		<Box minH="100vh" className="main-gradient">
			<Box p={8}>
				<NavBar />
			</Box>
			{children}
		</Box>
	);
};

export default AppLayout;
