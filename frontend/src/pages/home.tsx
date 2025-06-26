import { Box, Separator } from "@chakra-ui/react";
import { NextPageWithLayout } from "./_app";
import AppLayout from "@/components/layout/AppLayout";
import { colors } from "../theme/colors";
import { useState } from "react";

import {
	HomeMainView,
	HomeFeaturesView,
	HomeDemoView,
	HomeFAQView,
	HomeCTAView,
} from "../components/views";

const HomePage: NextPageWithLayout = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [openFaq, setOpenFaq] = useState(-1);

	return (
		<Box color={colors.primaryText}>
			{/* Hero Section */}
			<HomeMainView isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

			{/* Features Section */}
			<HomeFeaturesView />

			{/* Interactive Demo Section */}
			<HomeDemoView />

			<Separator h={30} borderColor={colors.infoCard} />
			{/*<WaveSeparator />*/}

			{/* FAQ Section */}
			<HomeFAQView openFaq={openFaq} setOpenFaq={setOpenFaq} />

			{/* Call to Action */}
			<HomeCTAView />
		</Box>
	);
};

HomePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default HomePage;
