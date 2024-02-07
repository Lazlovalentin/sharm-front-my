import createMiddleware from "next-intl/middleware";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from 'next/headers'

const protectedRoutes = ["/admin1"]

export default function middleware(request: NextRequest) {
    const responseForLocale = createMiddleware({
        locales: ['en', 'ua', 'ru'],
        localeDetection: true,
        localePrefix: "always",
        defaultLocale: 'ua'
    })(request);


    //  console.log("responseForLocale", responseForLocale)

    return responseForLocale;
}

export const config = {
    matcher: ['/', '/(ua|en|ru)/:path*']
};

/*
    const pathWithoutLocale = request.nextUrl.pathname.replace(/^\/(ua|en|ru)/, '');

    if(protectedRoutes.includes(pathWithoutLocale)) {
        if (role?.value === "") {
            console.log("work")
            const url = new URL("", request.nextUrl.origin);
            return NextResponse.redirect(url);
        }
    }

    console.log("role", role?.value === "user")
    console.log("request.nextUrl.pathname", request.nextUrl.pathname)
 */