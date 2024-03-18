import WrapperCategory from "@/components/admin/WrapperCategory/WrapperCategory";
import { useLocale } from "next-intl";
import { getAction } from "@/actions/getAction";

export default async function Home() {
  const locale = useLocale();
  const allCategories = await getAction(`categories/${locale}`);
  return (
    <>
      <WrapperCategory categories={allCategories} />
    </>
  );
}
