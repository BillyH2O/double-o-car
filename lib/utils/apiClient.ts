/**
 * Helper pour faire des appels API avec la locale
 * Utilise la locale depuis l'URL ou les paramètres
 */

/**
 * Récupère la locale depuis l'URL actuelle
 * @returns La locale ('fr', 'en', 'nl') ou 'fr' par défaut
 */
export function getLocaleFromUrl(): string {
  if (typeof window === 'undefined') {
    return 'fr' // Fallback pour SSR
  }

  const pathname = window.location.pathname
  const segments = pathname.split('/').filter(Boolean)
  
  // La locale est généralement le premier segment dans /[locale]/...
  const possibleLocales = ['fr', 'en', 'nl']
  if (segments.length > 0 && possibleLocales.includes(segments[0])) {
    return segments[0]
  }

  return 'fr' // Locale par défaut
}

/**
 * Crée une URL avec la locale en paramètre
 * @param url - L'URL de base
 * @param locale - La locale à ajouter
 * @returns L'URL avec le paramètre locale
 */
export function addLocaleToUrl(url: string, locale?: string): string {
  const actualLocale = locale || getLocaleFromUrl()
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}locale=${actualLocale}`
}

/**
 * Fait un appel fetch avec la locale automatiquement ajoutée
 * @param url - L'URL à appeler
 * @param options - Les options de fetch
 * @param locale - La locale (optionnelle, récupérée automatiquement si non fournie)
 * @returns La réponse fetch
 */
export async function fetchWithLocale(
  url: string,
  options?: RequestInit,
  locale?: string
): Promise<Response> {
  const actualLocale = locale || getLocaleFromUrl()
  
  // Ajouter la locale dans les headers
  const headers = new Headers(options?.headers)
  headers.set('x-locale', actualLocale)
  
  // Ajouter la locale dans l'URL si elle contient des query params
  const finalUrl = url.includes('?') 
    ? addLocaleToUrl(url, actualLocale)
    : url

  return fetch(finalUrl, {
    ...options,
    headers,
  })
}

