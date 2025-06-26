import { NextPageWithLayout } from "@/pages/_app";
import AppLayout from "@/components/layout/AppLayout";
import { UserMonsterView } from "@/components/views";

const MonsterPage: NextPageWithLayout = () => {
	return <UserMonsterView />;
};

MonsterPage.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>;
};

export default MonsterPage;
