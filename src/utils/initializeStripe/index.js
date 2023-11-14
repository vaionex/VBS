import Stripe from 'stripe'

let stripe
if (
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
  process.env.NEXT_PUBLIC_PAYMENT_PLATFORM === 'stripe'
) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
}

export default stripe
