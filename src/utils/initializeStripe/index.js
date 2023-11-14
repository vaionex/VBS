import { loadStripe } from '@stripe/stripe-js'

export const initializeStripe = async () => {
  if (
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_PAYMENT_PLATFORM === 'stripe'
  ) {
    return await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  } else {
    console.log('Stripe initialization conditions not met.')
    return null
  }
}
