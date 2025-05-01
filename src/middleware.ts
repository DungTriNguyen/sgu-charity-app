export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/login',
    '/forgot-password',
    // "/reset-password",
    '/projects/:id*/register-volunteer',
    '/user/edit-profile',
    '/user(.*)',
    '/',
  ],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  // Redirect unauthenticated users from protected routes
  const protectedRoutes = [
    '/register-volunteer',
    '/user/profile',
    '/user/edit-profile',
    '/user/donated-history',
  ];
  // console.log(protectedRoutes.includes(pathname), pathname, token);

  if (!token && protectedRoutes.some((route) => pathname.includes(route))) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  return NextResponse.next();
}
