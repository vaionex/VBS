import { buffer } from 'micro'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req) {
  let event = req.body

  if (endpointSecret) {
    const signature = req.headers['stripe-signature']
    try {
      event = stripe.webhooks.constructEvent(
        (await buffer(req)).toString(),
        signature,
        endpointSecret,
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return Response.status(400).json()
    }
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('Payment Intent succeded!')
      break

    case 'customer.subscription.created':
    case 'customer.subscription.deleted':
    case 'customer.subscription.paused':
    case 'customer.subscription.resumed':
    case 'customer.subscription.updated':
    case 'customer.subscription.trial_will_end':
      console.log('Customer subscription changed')
      break

    default:
      return Response.json({
        message: `Webhook not implemented for ${event.type}`,
      })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
