import type { Locale } from '@/i18n'

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://double-o-car.com'
).replace(/\/$/, '')

export const siteName = 'Double-O Car'

export const ogLocaleMap: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  nl: 'nl_NL',
}

export function localizedUrl(locale: string, path = '') {
  const clean = path === '/' ? '' : path
  return `${siteUrl}/${locale}${clean}`
}
