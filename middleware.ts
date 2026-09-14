import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore static assets, internal Next.js paths, api routes, and sitemaps/robots
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Rule 1: Strip legacy /fr or /nl language prefixes (301 permanent)
  if (/^\/(fr|nl)(\/|$)/.test(pathname)) {
    const cleanPath = pathname.replace(/^\/(fr|nl)/, '') || '/'
    const url = request.nextUrl.clone()
    url.pathname = cleanPath
    return NextResponse.redirect(url, { status: 301 })
  }

  // Rule 2: Enforce lowercase URLs
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.toLowerCase()
    return NextResponse.redirect(url, { status: 301 })
  }

  // Rule 3: Remove trailing slash (except homepage '/')
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
