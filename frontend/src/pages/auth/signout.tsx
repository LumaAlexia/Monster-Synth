import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { AuthSignOutView } from "@/components/views";

const SignOutPage: NextPageWithLayout = () => {
	return <AuthSignOutView />;
};

SignOutPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default SignOutPage;
