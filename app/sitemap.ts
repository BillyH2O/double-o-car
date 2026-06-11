import type { MetadataRoute } from 'next'
import { locales, defaultLocale } from '@/i18n'
import { prisma } from '@/lib/prisma'
import { siteUrl } from '@/lib/site'

export const revalidate = 3600

const staticPaths = [
  '',
  '/vehicules',
  '/contact',
  '/a-propos',
  '/mentions-legales',
  '/politique-de-confidentialite',
] as const

function alternatesFor(path: string) {
  const languages: Record<string, string> = {}
  for (const locale of locales) {
    languages[locale] = `${siteUrl}/${locale}${path}`
  }
  languages['x-default'] = `${siteUrl}/${defaultLocale}${path}`
  return { languages }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const path of staticPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : 0.7,
        alternates: alternatesFor(path),
      })
    }
  }

  try {
    const vehicles = await prisma.vehicle.findMany({
      select: { slug: true, updatedAt: true },
    })

    for (const vehicle of vehicles) {
      const path = `/vehicules/${vehicle.slug}`
      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}/${locale}${path}`,
          lastModified: vehicle.updatedAt,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: alternatesFor(path),
        })
      }
    }
  } catch (error) {
    console.error('[sitemap] Impossible de charger les véhicules:', error)
  }

  return entries
}
