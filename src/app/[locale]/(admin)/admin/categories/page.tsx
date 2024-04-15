import { useLocale } from "next-intl";
import { getAction } from "@/actions/getAction";
import CategoryItem from "@/components/admin/CategoryItem/CategoryItem";
import WrapperTreeList from "@/components/admin/Wrapper/WrapperTreeList";

export default async function Home() {
  const locale = useLocale();
  const allCategories = await getAction(`categories/${locale}`);
  return (
    <>
      <WrapperTreeList data={allCategories} type="category">
        <CategoryItem parentId={allCategories[0]?.id} category={null} />
      </WrapperTreeList>
    </>
  );
}
