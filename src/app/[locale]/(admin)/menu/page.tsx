import { getAction } from "@/actions/getAction";
import WrapperMenu from "@/components/admin/WrapperMenu/WrapperMenu";
import { useLocale } from "next-intl";

export default async function Home() {
  const locale = useLocale();
  const allMenus = await getAction(`menu/${locale}`);
  return (
    <>
      <WrapperMenu menu={allMenus} />
    </>
  );
}
