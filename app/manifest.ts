import type { MetadataRoute } from 'next'
import { siteName } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} - Location de voitures à Marrakech`,
    short_name: siteName,
    description:
      'Louez votre voiture en toute simplicité à Marrakech avec Double-O Car.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#003CF0',
    icons: [
      {
        src: '/favicon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
