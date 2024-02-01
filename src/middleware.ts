import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
    locales: ['en', 'ua', 'ru'],
    localeDetection: true,
    localePrefix: "always",
    defaultLocale: 'ua'
});


export const config = {
    matcher: ['/', '/(ua|en|ru)/:path*']
};