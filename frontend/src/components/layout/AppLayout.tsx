import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import NavBar from "../NavBar";
import { colors } from "@/theme/colors";

interface AppLayoutProps {
	children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
	return (
		<Box bg={colors.egyptian_blue[900]} minH="100vh">
			<NavBar />
			{children}
		</Box>
	);
};

export default AppLayout;
