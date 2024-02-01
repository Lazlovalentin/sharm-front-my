"use server"
import ThemeSwitcher from "@/components/general/ThemeSwitcher/ThemeSwitcher";
import {getTranslations} from 'next-intl/server';
import LocalSwitch from "@/components/admin/LocalSwitch/LocalSwitch";

export default async function Home() {
    const t = await getTranslations('Index');

    return (
        <>
            <ThemeSwitcher/>
            <div><h1>{t('title')}</h1></div>
            <LocalSwitch/>
        </>
    );
}
