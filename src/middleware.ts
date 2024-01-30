import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

const protectedAdminRoutes = ['/dashboard']
const protectedClientRoutes = ['/admin']


const isLogin = true
let locales = ['en-US', 'nl-NL', 'nl']

function getLocale(header: string | null): string {
    if (!header) return ''
    const languages = header.split(',')
        .map(lang => {
            const [name, qValue] = lang.split(';q=');
            return { name: name.trim(), qValue: qValue ? parseFloat(qValue) : 1 };
        })
        .sort((a, b) => b.qValue - a.qValue);

    return languages.length > 0 ? languages[0].name : '';
}


export function middleware(request: NextRequest) {
    //   console.log("role", request)


    //-------- language ------------//
    const {pathname} = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
   // const locale = getLocale(request.headers.get('accept-language'))
    const preferredLocale = request.headers.get('accept-language');
    const locale = getLocale(preferredLocale)

    const cookieLocale = request.cookies.get('NEXT_LOCALE');
    console.log("locale", cookieLocale)


    //-------------Theme----------------//
    const theme = request.cookies.get('theme')
    const role = request.headers.get('role')


    console.log("role", role)
    console.log("theme", theme)


    let headers = new Headers(request.headers)


    //-------------app rout----------------//
    if (isLogin) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: ['/admin', '/dashboard'],
    /*
      if (!isLogin && protectedClientRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url))
    }
     */
}
