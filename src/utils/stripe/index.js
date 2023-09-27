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
// import { httpsCallable } from 'firebase/functions'
// import { functions } from '@/firebase/functions'
import { initializeStripe } from '../initializeStripe'

export const getPricingPlans = async () => {
  try {
    // To get plans documents
    const collectionRef = collection(firestore, 'plans')
    const plansDocs = await getDocs(collectionRef)
    const plans = []
    plansDocs.forEach((doc) => {
      plans.push({ ...doc.data(), id: doc.id })
    })

    // Free price plan collection ref
    const freePlanId =
      process.env.VERCEL_ENV !== 'production'
        ? process.env.NEXT_PUBLIC_DEV_STRIPE_FREE_PRODUCT_ID
        : process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_ID
    const freePlanDocumentRef = doc(firestore, 'plans', freePlanId)
    const freePlanSubCollectionRef = collection(freePlanDocumentRef, 'prices')

    // Pro price plan collection ref
    const proPlanId =
      process.env.VERCEL_ENV !== 'production'
        ? process.env.NEXT_PUBLIC_DEV_STRIPE_PRO_PRODUCT_ID
        : process.env.NEXT_PUBLIC_STRIPE_PRO_PRODUCT_ID
    const proPlanDocumentRef = doc(firestore, 'plans', proPlanId)
    const proPlanSubCollectionRef = collection(proPlanDocumentRef, 'prices')

    // Enterprise price plan collection ref
    const businessPlanId =
      process.env.VERCEL_ENV !== 'production'
        ? process.env.NEXT_PUBLIC_DEV_STRIPE_BUSINESS_PRODUCT_ID
        : process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRODUCT_ID
    const enterprisePlanDocumentRef = doc(firestore, 'plans', businessPlanId)
    const enterprisePlanSubCollectionRef = collection(
      enterprisePlanDocumentRef,
      'prices',
    )

    // To fetch prices
    const [freePricesSnapshot, proPricesSnapshot, enterprisePricesSnapshot] =
      await Promise.all([
        getDocs(freePlanSubCollectionRef),
        getDocs(proPlanSubCollectionRef),
        getDocs(enterprisePlanSubCollectionRef),
      ])

    const freePlansData = freePricesSnapshot.docs.map((price) => ({
      id: price.id,
      ...price.data(),
    }))
    const proPlansData = proPricesSnapshot.docs.map((price) => ({
      id: price.id,
      ...price.data(),
    }))
    const enterprisePlansData = enterprisePricesSnapshot.docs.map((price) => ({
      id: price.id,
      ...price.data(),
    }))
    const prices = [freePlansData, proPlansData, enterprisePlansData]
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
        console.log('stripe error occured', error)
        // Handle the error using the provided errorHandle function or throw an error
        errorHandle(error?.message)
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        console.log('redirecting user')
        window.location.assign(url)
      }
    })
  } catch (error) {
    console.error('Error initiating subscription:', error)
    throw error
  }
}
