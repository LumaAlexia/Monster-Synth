import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "../_app";
import { Box, Text } from "@chakra-ui/react";

export const SettingsPage: NextPageWithLayout = () => {
	return (
		<Box>
			<Text>Settings</Text>
		</Box>
	);
};

SettingsPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;
