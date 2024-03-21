import { getAction } from "@/actions/getAction";
import Wrapper from "@/components/admin/Wrapper/Wrapper";
import { useLocale } from "next-intl";

export default async function Home() {
  const locale = useLocale();
  const allMenus = await getAction(`menu/${locale}`);
  return (
    <>
      <Wrapper data={allMenus} type="menu" />{" "}
    </>
  );
}
