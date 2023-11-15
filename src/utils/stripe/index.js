import stripe from '../initializeStripe'

import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export const getProductsWithPlans = async () => {
  if (process.env.NEXT_PUBLIC_PAYMENT_PLATFORM !== 'stripe') {
    return getPlaceholderPlans()
  }
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

const getPlaceholderPlans = () => {
  const placeholderPlans = [
    {
      id: 'placeholder_free',
      object: 'product',
      active: true,
      attributes: [],
      created: Date.now() / 1000,
      default_price: 'placeholder_price_free',
      description: null,
      features: [],
      images: [],
      livemode: false,
      metadata: {
        description: 'Free',
        features: "['Basic features for normal usage']",
        title: 'Basic',
        upsell_discount: '0',
      },
      name: 'VBS_free',
      type: 'service',
      prices: [
        {
          id: 'placeholder_price_free',
          object: 'price',
          unit_amount: 0,
          currency: 'usd',
          interval: 'month',
          recurring: { interval: 'month' },
        },
      ],
    },
    {
      id: 'placeholder_plus',
      object: 'product',
      active: true,
      attributes: [],
      created: Date.now() / 1000,
      default_price: 'placeholder_price_plus',
      description: null,
      features: [],
      images: [],
      livemode: false,
      metadata: {
        description: 'Plus',
        features: "['Advance features']",
        title: 'Plus Plan',
        upsell_discount: '60',
      },
      name: 'VBS_plus',
      type: 'service',
      prices: [
        {
          id: 'placeholder_price_plus_monthly',
          object: 'price',
          unit_amount: 3000,
          currency: 'usd',
          interval: 'month',
          recurring: { interval: 'month' },
        },
        {
          id: 'placeholder_price_plus_yearly',
          object: 'price',
          unit_amount: 30000,
          currency: 'usd',
          interval: 'year',
          recurring: { interval: 'year' },
        },
      ],
    },
  ]

  return placeholderPlans
}

export const initiateSubscription = async (priceId) => {
  const stripe = await stripePromise
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    })

    const session = await response.json()

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
