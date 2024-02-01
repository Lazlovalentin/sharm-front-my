"use client"
import {useLocale} from "next-intl";
import {usePathname, useSearchParams, useRouter} from 'next/navigation'

const LocaleSwitch = () => {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const change = (newLocal: string) => {
        const newPathname = `/${newLocal}/${pathname.split('/').slice(2).join('/')}`;
        router.push(`${newPathname}`);
    }

    return (
        <button onClick={() => change(locale === "ua" ? "en" : "ua")}>
            change language
        </button>
    );
}

export default LocaleSwitch;

