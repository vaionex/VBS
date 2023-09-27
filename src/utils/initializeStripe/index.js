import { loadStripe } from '@stripe/stripe-js'

export const initializeStripe = async () => {
  // Load Stripe.js with your publishable key
  const stripe = await loadStripe(
    process.env.VERCEL_ENV !== 'production'
      ? process.env.NEXT_PUBLIC_STRIPE_DEV_PUBLISHABLE_KEY
      : process.env.NEXT_PUBLIC_STRIPE_LIVE_PUBLISHABLE_KEY,
  )
  return stripe
}
