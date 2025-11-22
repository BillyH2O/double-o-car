import createMiddleware from 'next-intl/middleware';
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' // Toujours afficher la locale dans l'URL (/fr, /en, /nl)
});

export function middleware(request: NextRequest) {
  // Ignorer les routes API et admin (elles n'ont pas besoin de locale)
  const pathname = request.nextUrl.pathname;
  
  if (pathname.startsWith('/api') || pathname.startsWith('/admin')) {
    // Ajouter le pathname aux headers pour le layout admin
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-pathname", pathname)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Redirection explicite de la racine vers /fr
  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/fr`
    return NextResponse.redirect(url)
  }

  // Ajouter le pathname aux headers pour le layout
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-pathname", pathname)

  // Appliquer le middleware i18n pour les autres routes
  const response = intlMiddleware(request);
  
  // Ajouter les headers personnalisés à la réponse
  if (response) {
    response.headers.set("x-pathname", pathname);
    return response;
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  // Matcher pour toutes les routes sauf les fichiers statiques et les API routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

