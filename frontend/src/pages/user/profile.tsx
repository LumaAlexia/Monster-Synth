import AppLayout from "@/components/layout/AppLayout";
import { NextPageWithLayout } from "../_app";
import { UserProfileView } from "@/components/views";

const ProfilePage: NextPageWithLayout = () => {
	return <UserProfileView />;
};

ProfilePage.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default ProfilePage;
