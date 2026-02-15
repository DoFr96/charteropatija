import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match only localized routes, exclude everything else
  matcher: [
    // Match root
    '/',
    // Match locale prefixed paths
    '/(de|en)/:path*',
    // Match paths that need locale but exclude api, admin, _next, static files
    '/((?!api|admin|_next|_vercel|my-route|.*\\..*).*)'
  ],
}
