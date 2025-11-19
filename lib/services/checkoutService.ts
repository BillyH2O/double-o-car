export interface StartCheckoutOptions {
  startDate?: string
  endDate?: string
  pickupLocation?: string
  returnLocation?: string
  successUrl?: string
  cancelUrl?: string
  customerEmail?: string
}

export interface CheckoutSessionResponse {
  url: string
}

class CheckoutService {
  async createCheckoutSession(
    vehicleId: string,
    options?: StartCheckoutOptions
  ): Promise<CheckoutSessionResponse> {
    const response = await fetch('/api/checkout/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicleId, ...options }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || 'Failed to create checkout session')
    }

    return response.json()
  }
}

export const checkoutService = new CheckoutService()

