import { useLocale } from "next-intl";
import { getAction } from "@/actions/getAction";
import Wrapper from "@/components/admin/Wrapper/WrapperTreeList";
import CategoryItem from "@/components/admin/CategoryItem/CategoryItem";

export default async function Home() {
  const locale = useLocale();
  const allCategories = await getAction(`categories/${locale}`);
  return (
    <>
      <Wrapper data={allCategories} type="category">
        <CategoryItem parentId={allCategories[0]?.id} category={null} />
      </Wrapper>
    </>
  );
}
