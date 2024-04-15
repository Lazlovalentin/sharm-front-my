"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import styles from './localSwitcher.module.scss';

const LocaleSwitch = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const change = (newLocal: string) => {
    const newPathname = `/${newLocal}/${pathname
      .split("/")
      .slice(2)
      .join("/")}`;
    router.push(`${newPathname}`);
  };

  return (
    <div className={styles.container}>
      <select
        title="selectLang"
        value={locale}
        onChange={(e) => change(e.target.value)}>
        <option value="ua">Укр</option>
        <option value="en">Eng</option>
        <option value="ru">Рус</option>
      </select>
    </div>
  );
};

export default LocaleSwitch;
