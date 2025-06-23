import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import NavBar from "../NavBar";
import { colors } from "@/theme/colors";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box bg={colors.dark_purple.DEFAULT} minH="100vh">
      <NavBar />
      <Container maxW="container.xl" px={4}>
        {children}
      </Container>
    </Box>
  );
};

export default AppLayout;
