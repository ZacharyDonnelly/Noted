import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};

const middleware = (request: NextRequest): NextResponse => {
  const allCookies: RequestCookie[] = request.cookies.getAll();
  let cookie: RequestCookie = request.cookies.get('nextjs') || { name: '', value: '' };

  request.cookies.has('nextjs');
  request.cookies.delete('nextjs');
  request.cookies.has('nextjs');

  const response: NextResponse = NextResponse.next();

  response.cookies.set('vercel', 'fast');

  response.cookies.set({
    name: 'vercel',
    value: 'fast',
    path: '/'
  });

  cookie = response.cookies.get('vercel') || ({ name: '', value: '' } as RequestCookie);
  // eslint-disable-next-line no-console
  console.log('COOKIE_FINALE', allCookies, cookie, response.cookies);
  return response;
};

export default middleware;
// // export default middleware;
// import { NextResponse, type NextRequest } from 'next/server';

// export function middleware(request: NextRequest): NextResponse {
//   const currentUser = request.cookies.get('currentUser')?.value;

//   if (currentUser) {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }
//   return NextResponse.redirect(new URL('/login', request.url));
// }
