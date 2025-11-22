import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

/**
 * Route pour annuler une réservation PENDING lorsqu'un utilisateur annule le checkout Stripe
 * Peut être appelée avec un session_id ou un bookingId
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { sessionId, bookingId } = body as {
      sessionId?: string
      bookingId?: string
    }

    let bookingToCancel

    // Si on a un sessionId, récupérer la réservation via la session Stripe
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        const bookingIdFromSession = (session.metadata as Record<string, string> | null)?.bookingId
        
        if (bookingIdFromSession) {
          bookingToCancel = await prisma.booking.findUnique({
            where: { id: bookingIdFromSession },
          })
        }
      } catch (error) {
        console.error('[checkout/cancel] Erreur lors de la récupération de la session Stripe:', error)
      }
    }

    // Si on a directement un bookingId ou si la session n'a pas fonctionné
    if (!bookingToCancel && bookingId) {
      bookingToCancel = await prisma.booking.findUnique({
        where: { id: bookingId },
      })
    }

    if (!bookingToCancel) {
      return new Response('Réservation non trouvée', { status: 404 })
    }

    // Ne peut annuler que les réservations PENDING
    if (bookingToCancel.status !== 'PENDING') {
      return new Response(`Impossible d'annuler une réservation avec le statut ${bookingToCancel.status}`, { status: 400 })
    }

    // Annuler la réservation
    await prisma.booking.update({
      where: { id: bookingToCancel.id },
      data: {
        status: 'CANCELLED',
      },
    })

    console.log(`[checkout/cancel] Réservation ${bookingToCancel.id} annulée avec succès`)

    return Response.json({ success: true, bookingId: bookingToCancel.id })
  } catch (e) {
    console.error('[checkout/cancel] error', e)
    return new Response(`Server error: ${e instanceof Error ? e.message : 'Unknown error'}`, { status: 500 })
  }
}

/**
 * Route GET pour annuler via query params (utilisée depuis la page cancel)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')
    const bookingId = searchParams.get('booking_id')

    if (!sessionId && !bookingId) {
      return new Response('Missing session_id or booking_id', { status: 400 })
    }

    let bookingToCancel

    // Si on a un sessionId, récupérer la réservation via la session Stripe
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        const bookingIdFromSession = (session.metadata as Record<string, string> | null)?.bookingId
        
        if (bookingIdFromSession) {
          bookingToCancel = await prisma.booking.findUnique({
            where: { id: bookingIdFromSession },
          })
        }
      } catch (error) {
        console.error('[checkout/cancel] Erreur lors de la récupération de la session Stripe:', error)
      }
    }

    // Si on a directement un bookingId ou si la session n'a pas fonctionné
    if (!bookingToCancel && bookingId) {
      bookingToCancel = await prisma.booking.findUnique({
        where: { id: bookingId },
      })
    }

    if (!bookingToCancel) {
      return new Response('Réservation non trouvée', { status: 404 })
    }

    // Ne peut annuler que les réservations PENDING
    if (bookingToCancel.status !== 'PENDING') {
      return new Response(`Impossible d'annuler une réservation avec le statut ${bookingToCancel.status}`, { status: 400 })
    }

    // Annuler la réservation
    await prisma.booking.update({
      where: { id: bookingToCancel.id },
      data: {
        status: 'CANCELLED',
      },
    })

    console.log(`[checkout/cancel] Réservation ${bookingToCancel.id} annulée avec succès`)

    return Response.json({ success: true, bookingId: bookingToCancel.id })
  } catch (e) {
    console.error('[checkout/cancel] error', e)
    return new Response(`Server error: ${e instanceof Error ? e.message : 'Unknown error'}`, { status: 500 })
  }
}

