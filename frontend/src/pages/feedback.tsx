import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "./_app";
import { FeedbackView } from "@/components/views";

const FeedbackPage: NextPageWithLayout = () => {
	return <FeedbackView />;
};

FeedbackPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default FeedbackPage;
