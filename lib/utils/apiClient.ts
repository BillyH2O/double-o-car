/**
 * Helper pour faire des appels API avec la locale
 * La locale doit être fournie depuis useLocale() dans les composants React
 */

/**
 * Fait un appel fetch avec la locale dans les headers
 * @param url - L'URL à appeler
 * @param options - Les options de fetch
 * @param locale - La locale (obligatoire, doit venir de useLocale() dans les composants)
 * @returns La réponse fetch
 */
export async function fetchWithLocale(
  url: string,
  options: RequestInit | undefined,
  locale: string
): Promise<Response> {
  // Ajouter la locale dans les headers
  const headers = new Headers(options?.headers)
  headers.set('x-locale', locale)
  
  // Ajouter la locale dans l'URL si elle contient des query params
  const finalUrl = url.includes('?') 
    ? `${url}&locale=${locale}`
    : url

  return fetch(finalUrl, {
    ...options,
    headers,
  })
}

