import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export async function POST(request) {
  console.log('Request of Subscription Id', request)

  try {
    const { subscriptionId } = await request.json()
    const canceledSubscription = await stripe.subscriptions.cancel(
      subscriptionId,
    )
    return NextResponse.json({ canceledSubscription })
  } catch (error) {
    console.error('Error canceling subscription:', error)
    return NextResponse.error('Failed to cancel subscription', 500)
  }
}
