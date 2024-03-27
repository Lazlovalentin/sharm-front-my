import { getAction } from "@/actions/getAction";
import MenuItem from "@/components/admin/MenuItem/MenuItem";
import WrapperTreeList from "@/components/admin/Wrapper/WrapperTreeList";
import { useLocale } from "next-intl";

export default async function Home() {
  const locale = useLocale();
  const allMenus = await getAction(`menu/${locale}`);
  return (
    <>
      <WrapperTreeList data={allMenus} type="menu">
        <MenuItem parentId={allMenus[0]?.id} menu={null} />
      </WrapperTreeList>
    </>
  );
}
