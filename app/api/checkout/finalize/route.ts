import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      return new Response('Missing session_id', { status: 400 })
    }

    console.log('[checkout/finalize] Récupération de la session Stripe:', sessionId)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer_details', 'custom_fields', 'payment_intent'],
    })

    console.log('[checkout/finalize] Statut de la session:', {
      payment_status: session.payment_status,
      status: session.status,
      metadata: session.metadata,
    })

    // Vérifier que le paiement est bien complété
    if (session.payment_status !== 'paid') {
      console.warn('[checkout/finalize] Paiement non complété:', session.payment_status)
      return new Response(`Paiement non complété. Statut: ${session.payment_status}`, { status: 400 })
    }

    const bookingId = (session.metadata as Record<string, string> | null)?.bookingId
    if (!bookingId) {
      console.error('[checkout/finalize] Booking metadata missing')
      return new Response('Booking metadata missing', { status: 400 })
    }

    console.log('[checkout/finalize] Booking ID trouvé:', bookingId)

    const s = session as unknown as Stripe.Checkout.Session
    const cd = s.customer_details || null
    const customFields = (s.custom_fields ?? undefined) as Array<{ key: string; text?: { value?: string | null } }> | undefined

    const firstName =
      customFields?.find((f) => f.key === 'first_name')?.text?.value ||
      (cd?.name ? cd.name.split(' ').slice(0, -1).join(' ') || cd.name : null)
    const lastName =
      customFields?.find((f) => f.key === 'last_name')?.text?.value ||
      (cd?.name ? cd.name.split(' ').slice(-1).join(' ') : null)

    const paymentIntentId = typeof s.payment_intent === 'string' 
      ? s.payment_intent 
      : (s.payment_intent as Stripe.PaymentIntent)?.id

    // Mettre à jour la réservation
    console.log('[checkout/finalize] Mise à jour de la réservation:', bookingId)
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        guestEmail: cd?.email || undefined,
        guestFirstName: firstName || undefined,
        guestLastName: lastName || undefined,
        guestPhone: cd?.phone || undefined,
        stripePaymentIntentId: paymentIntentId || undefined,
        status: 'CONFIRMED',
      },
      include: {
        vehicle: true,
      },
    })

    console.log('[checkout/finalize] Réservation mise à jour avec succès:', {
      bookingId: booking.id,
      status: booking.status,
      vehicleId: booking.vehicleId,
    })

    // Créer automatiquement une période d'indisponibilité pour les dates de la réservation
    try {
      // Vérifier si une période d'indisponibilité existe déjà pour ces dates
      const existingAvailability = await prisma.vehicleAvailability.findFirst({
        where: {
          vehicleId: booking.vehicleId,
          startDate: {
            lte: booking.endDate,
          },
          endDate: {
            gte: booking.startDate,
          },
          isAvailable: false,
        },
      })

      // Si aucune période n'existe, en créer une nouvelle
      if (!existingAvailability) {
        await prisma.vehicleAvailability.create({
          data: {
            vehicleId: booking.vehicleId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            isAvailable: false,
            reason: `Réservation confirmée #${booking.id.substring(0, 8)}`,
          },
        })
        console.log(`[checkout/finalize] Période d'indisponibilité créée pour la réservation ${booking.id}`)
      } else {
        console.log(`[checkout/finalize] Période d'indisponibilité déjà existante pour ces dates`)
      }
    } catch (availabilityError) {
      // Ne pas faire échouer la finalisation si la création de la période échoue
      console.error('[checkout/finalize] Erreur lors de la création de la période d\'indisponibilité:', availabilityError)
    }

    return Response.json({ ok: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('[checkout/finalize] error', message)
    return new Response(`Server error: ${message}`, { status: 500 })
  }
}

