import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "../_app";
import { UserSettingsView } from "@/components/views";

export const SettingsPage: NextPageWithLayout = () => {
	return <UserSettingsView />;
};

SettingsPage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default SettingsPage;
