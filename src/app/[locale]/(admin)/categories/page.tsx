import { useLocale } from "next-intl";
import { getAction } from "@/actions/getAction";
import Wrapper from "@/components/admin/Wrapper/Wrapper";

export default async function Home() {
  const locale = useLocale();
  const allCategories = await getAction(`categories/${locale}`);
  return (
    <>
      <Wrapper data={allCategories} type="categories" />
    </>
  );
}
