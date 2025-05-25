import { NextRequest, NextResponse } from 'next/server'
import ROUTES from './routes/routes';

const ROUTES_PUBLIC = ['/login', '/register'];
const ROUTES_PRIVATE = ['/admin', '/profile', '/cart'];

function isMatch(pathname: string, routes: string[]) {
    return routes.some(route => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;

    const isPublic = isMatch(pathname, ROUTES_PUBLIC);
    const isPrivate = isMatch(pathname, ROUTES_PRIVATE);

    // Nếu route không cần auth
    if (isPublic) {
        if (!token) return NextResponse.next();
        else return NextResponse.redirect(new URL(ROUTES.home, request.url))
    };


    // Nếu là route private, bắt buộc có token
    if (isPrivate) {
        if (!token) {
            return NextResponse.redirect(new URL(ROUTES.login, request.url));
        }

        // Gọi BE để xác thực token
        try {
            const res = await fetch(`${process.env.API_URL}/api/auth/me`, {
                headers: {
                    Cookie: `token=${token}`,
                },
            });

            if (res.ok) {
                return NextResponse.next(); // Authenticated
            } else {
                return NextResponse.redirect(new URL(ROUTES.login, request.url));
            }
        } catch {
            return NextResponse.redirect(new URL(ROUTES.login, request.url))
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/cart/:path*',
        '/profile/:path*',
        '/login',
        '/register',
    ]
}
