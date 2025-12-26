import Stripe from 'stripe'

// Client Stripe côté serveur (pour les API routes)
// Retourne null si la clé API n'est pas fournie
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    })
  : null

// Fonction utilitaire pour vérifier si Stripe est configuré
export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY
}





