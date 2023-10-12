import {
  collection,
  doc,
  where,
  query,
  addDoc,
  onSnapshot,
  getDocs,
  getDoc,
} from 'firebase/firestore'
import { firestore } from '@/firebase/firestore'
import { auth } from '@/firebase/auth'
import { initializeStripe } from '../initializeStripe'

export const getPricingPlans = async () => {
  try {
    // To get plans documents
    const collectionRef = collection(firestore, 'products')
    const plansDocs = await getDocs(collectionRef)
    const plans = []
    plansDocs.forEach((doc) => {
      plans.push({ ...doc.data(), id: doc.id })
    })

    // Free price plan collection ref
    const freePlanDocumentRef = doc(
      firestore,
      'products',
      process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_ID,
    )
    const freePlanSubCollectionRef = collection(freePlanDocumentRef, 'prices')

    // Pro price plan collection ref
    const proPlanDocumentRef = doc(
      firestore,
      'products',
      process.env.NEXT_PUBLIC_STRIPE_PLUS_PRODUCT_ID,
    )
    const proPlanSubCollectionRef = collection(proPlanDocumentRef, 'prices')

    // To fetch prices
    const [freePricesSnapshot, proPricesSnapshot] = await Promise.all([
      getDocs(freePlanSubCollectionRef),
      getDocs(proPlanSubCollectionRef),
    ])

    const freePlansData = freePricesSnapshot.docs.map((price) => ({
      id: price.id,
      ...price.data(),
    }))
    const proPlansData = proPricesSnapshot.docs.map((price) => ({
      id: price.id,
      ...price.data(),
    }))
    const prices = [freePlansData, proPlansData]
    const mappedPlans = plans.map((plan, index) => ({
      ...plan,
      prices: prices[index],
    }))

    return mappedPlans
  } catch (error) {
    console.error('Error retrieving pricing plans:', error)
    throw error
  }
}

export const initiateSubscription = async (planProductId, errorHandle) => {
  const checkoutSessionData = {
    price: planProductId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  }

  try {
    const docRef = await addDoc(
      collection(
        firestore,
        'customers',
        auth.currentUser.uid,
        'checkout_sessions',
      ),
      checkoutSessionData,
    )
    onSnapshot(docRef, async (snap) => {
      const { error, url, sessionId } = snap.data()
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await initializeStripe()
        stripe.redirectToCheckout({ sessionId })
      }
      if (error) {
        console.error('stripe error occured', error)
        // Handle the error using the provided errorHandle function or throw an error
        errorHandle(error?.message)
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url)
      }
    })
  } catch (error) {
    console.error('Error initiating subscription:', error)
    throw error
  }
}

export const getCurrentUserSubscriptions = async (uid) => {
  const customerRef = doc(firestore, 'customers', uid)
  const subscriptionsRef = collection(customerRef, 'subscriptions')

  const subscriptionsQuery = query(
    subscriptionsRef,
    where('status', 'in', ['trialing', 'active']),
  )

  const [subscriptionSnapshot, customerSnapshot] = await Promise.all([
    getDocs(subscriptionsQuery),
    getDoc(customerRef),
  ])

  const subscriptionDoc = {
    uploadCount:
      customerSnapshot.exists() && customerSnapshot.data()?.uploadCount
        ? customerSnapshot.data().uploadCount
        : 0,
  }

  if (!subscriptionSnapshot.empty) {
    const subscriptionData = subscriptionSnapshot.docs[0].data()

    const pricePlanRef = subscriptionData.price
    const pricePlanSnapshot = await getDoc(pricePlanRef)

    const productPlanRef = subscriptionData.product
    const productPlanSnapshot = await getDoc(productPlanRef)

    subscriptionDoc.pricePlan = pricePlanSnapshot.data()
    subscriptionDoc.product = productPlanSnapshot.data()
    subscriptionDoc.priceId = subscriptionData.price.path
  } else {
    //free plan
    const pricePlanRef = doc(
      firestore,
      'products',
      process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_ID,
      'prices',
      process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_PRICE_ID,
    )
    const pricePlanSnapshot = await getDoc(pricePlanRef)

    const productPlanRef = doc(
      firestore,
      'products',
      process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_ID,
    )
    const productPlanSnapshot = await getDoc(productPlanRef)

    subscriptionDoc.pricePlan = pricePlanSnapshot.data()
    subscriptionDoc.product = productPlanSnapshot.data()
  }
  return subscriptionDoc
}
