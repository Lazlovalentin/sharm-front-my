import "../globals.css";
import MyThemeProvider from "@/components/general/MyThemeProvider/MyThemeProvider";

export default function RootLayout({
                                       children,
                                       params: {locale}
                                   }: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    return (
        <html lang={locale}>
        <body>
        <MyThemeProvider>
            {children}
        </MyThemeProvider>
        </body>
        </html>
    );
}

export function generateStaticParams() {
    return [
        {params: {locale: "en"}},
        {params: {locale: "ua"}},
        {params: {locale: "ru"}},
    ];
}