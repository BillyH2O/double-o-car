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
        src: '/32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
