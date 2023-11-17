import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-08-01',
})

export async function POST(req) {
  try {
    const { priceId } = await req.json()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000/pricing',
      cancel_url: 'http://localhost:3000/login',
    })

    return new Response(JSON.stringify({ id: session.id }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (err) {
    console.error('Error creating checkout session:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export const routeSegmentConfig = {
  api: {
    bodyParser: true,
  },
}
