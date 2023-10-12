import { loadStripe } from '@stripe/stripe-js'

export const initializeStripe = async () => {
  // Load Stripe.js with your publishable key
  return await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}
