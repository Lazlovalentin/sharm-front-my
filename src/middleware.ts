import { NextResponse} from 'next/server'
import type { NextRequest } from 'next/server'

const protectedAdminRoutes = ['/dashboard']
const protectedClientRoutes = ['/admin']


const isLogin = true

export function middleware(request: NextRequest) {
    let headers = new Headers(request.headers)
    const currentUser = request.cookies.get('currentUser')?.value

    console.log("currentUser", request.nextUrl.pathname)


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