import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Routes yang memerlukan autentikasi
const protectedRoutes = ['/my-bookings', '/booking'];

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isProtected = protectedRoutes.some((route) =>
          req.nextUrl.pathname.startsWith(route)
        );

        if (isProtected) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|public).*)'],
};
