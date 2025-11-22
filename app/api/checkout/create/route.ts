import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

function getBaseUrl() {
  // En production, utiliser l'URL du site déployé
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
  }
  
  // Fallback pour Vercel
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  // Fallback pour localhost
  return 'http://localhost:3000'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { 
      vehicleId, 
      startDate, 
      endDate, 
      pickupLocation, 
      returnLocation,
      successUrl, 
      cancelUrl, 
      customerEmail 
    } = body as {
      vehicleId?: string
      startDate?: string
      endDate?: string
      pickupLocation?: string
      returnLocation?: string
      successUrl?: string
      cancelUrl?: string
      customerEmail?: string
    }

    if (!vehicleId) {
      return new Response('Missing vehicleId', { status: 400 })
    }

    // Récupérer le véhicule
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    })

    if (!vehicle || !vehicle.isAvailable) {
      return new Response('Vehicle not found or unavailable', { status: 404 })
    }

    // Calculer le prix total
    if (!startDate || !endDate) {
      return new Response('Missing startDate or endDate', { status: 400 })
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    
    if (days <= 0) {
      return new Response('Invalid date range', { status: 400 })
    }

    const pricePerDay = Number(vehicle.pricePerDay)
    const totalPrice = pricePerDay * days

    const baseUrl = getBaseUrl()
    const success = successUrl || `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
    const cancel = cancelUrl || `${baseUrl}/checkout/cancel`

    // Créer une réservation en attente dans la base de données
    const booking = await prisma.booking.create({
      data: {
        vehicleId: vehicle.id,
        startDate: start,
        endDate: end,
        totalPrice: totalPrice,
        status: 'PENDING',
        pickupLocation: pickupLocation || undefined,
        dropoffLocation: returnLocation || undefined,
      },
    })

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_creation: 'always',
      phone_number_collection: { enabled: true },
      billing_address_collection: 'required',
      shipping_address_collection: { 
        allowed_countries: ['FR', 'BE', 'CH', 'MA', 'DZ', 'TN'] 
      },
      custom_fields: [
        {
          key: 'first_name',
          label: { type: 'custom', custom: 'Prénom' },
          type: 'text',
          optional: false,
        },
        {
          key: 'last_name',
          label: { type: 'custom', custom: 'Nom' },
          type: 'text',
          optional: false,
        },
      ],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: Math.round(totalPrice * 100), // Convertir en centimes
            product_data: {
              name: `${vehicle.brand} ${vehicle.model} ${vehicle.year}`,
              description: `Location du ${start.toLocaleDateString('fr-FR')} au ${end.toLocaleDateString('fr-FR')} (${days} jour${days > 1 ? 's' : ''})`,
            },
          },
        },
      ],
      success_url: success,
      cancel_url: cancel,
      metadata: { 
        bookingId: booking.id, 
        vehicleId: vehicle.id,
        startDate: startDate,
        endDate: endDate,
        pickupLocation: pickupLocation || '',
        returnLocation: returnLocation || '',
      },
      customer_email: customerEmail || undefined,
    })

    // Mettre à jour la réservation avec l'ID de session Stripe
    await prisma.booking.update({
      where: { id: booking.id },
      data: {
        stripeCheckoutSessionId: session.id,
      },
    })

    return Response.json({ url: session.url, id: session.id })
  } catch (e) {
    console.error('[checkout/create] error', e)
    return new Response(`Server error: ${e instanceof Error ? e.message : 'Unknown error'}`, { status: 500 })
  }
}

