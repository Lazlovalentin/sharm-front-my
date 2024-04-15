import "../globals.css";
import MyThemeProvider from "@/components/general/MyThemeProvider/MyThemeProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* "extra attributes from the server" error fix https://www.reddit.com/r/nextjs/comments/138smpm/how_to_fix_extra_attributes_from_the_server_error/?rdt=36192 */}
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <MyThemeProvider>{children}</MyThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [
    { params: { locale: "en" } },
    { params: { locale: "ua" } },
    { params: { locale: "ru" } },
  ];
}
