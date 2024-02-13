import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/((?!public|static).*)' // match all paths not starting with 'public' or 'static'
  ]
};

export function middleware(request: NextRequest): NextResponse {
  const currentUser = request.cookies.get('currentUser')?.value;

  if (currentUser) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.redirect(new URL('/login', request.url));
}
