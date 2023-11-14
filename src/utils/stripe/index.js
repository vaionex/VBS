import stripe from '../initializeStripe'

import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const getProductsWithPlans = async () => {
  try {
    const productIds = [
      `${process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_ID}`,
      `${process.env.NEXT_PUBLIC_STRIPE_PLUS_PRODUCT_ID}`,
    ]

    const plans = []

    for (const productId of productIds) {
      const product = await stripe.products.retrieve(productId)
      const prices = await stripe.prices.list({ product: productId })

      const plan = {
        ...product,
        prices: prices.data.map((price) => ({ ...price })),
      }

      plans.push(plan)
    }

    return plans
  } catch (error) {
    console.error('Error retrieving products and plans:', error)
    throw error
  }
}

export const initiateSubscription = async (priceId) => {
  const stripe = await stripePromise
  try {
    // Checkout oturumu oluştur
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    })

    const session = await response.json()

    // Stripe Checkout sayfasına yönlendir
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      alert(result.error.message)
    }
  } catch (error) {
    console.error('Error initiating subscription:', error)
    alert('Subscription initiation failed:', error.message)
  }
}

// export const initiateSubscription = async (planProductId, errorHandle) => {
//   try {
//     const checkoutSessionData = {
//       price: planProductId,
//       success_url: window.location.origin,
//       cancel_url: window.location.origin,
//     }
//   } catch (error) {
//     console.error('Error initiating subscription:', error)
//     throw error
//   }
// }

export const getUserCurrentPlan = async (customerId) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    })

    const currentPlans = subscriptions.data.flatMap((subscription) =>
      subscription.items.data.map((item) => item.plan),
    )

    return currentPlans
  } catch (error) {
    console.error('Error fetching user current plan:', error)
    throw error
  }
}
