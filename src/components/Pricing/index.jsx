'use client'

import { useState } from 'react'
import PricingCard from './PricingCard'
import { initiateSubscription } from '@/utils/stripe'
import { useRouter } from 'next/navigation'
import { useFirebaseAuthContext } from '@/contexts/firebaseAuthContext'
import { useFirebaseAuth } from '@/firebase/auth'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

const comingSoonFeatures = [
  ['Access to US & UK templates', 'Email support'],
  [
    'Access to US, UK+ more premium contract templates',
    'AI-based contract drafting',
    'Multi-user access (Up to 3 users)',
    'Integration with e-signature platform',
    'Export contracts',
    'Email support',
  ],
  [
    'Access to US, UK+ more premium contract templates',
    'AI-based contract drafting',
    'Multi-user access (Up to 5 users)',
    'Integration with e-signature platform',
    'Export contracts',
    'Email support',
  ],
]

export default function Products({ plans }) {
  const { authUser } = useFirebaseAuthContext()
  const firebaseAuth = useFirebaseAuth()
  const { push } = useRouter()

  const [activeTab, setActiveTab] = useState('month')
  const [selectedPlan, setSelectedPlan] = useState(plans[0]?.id)
  const [loadingStripeCheckout, setloadingStripeCheckout] = useState(false)
  const currentPlan =
    firebaseAuth?.authUser?.userSubscription?.pricePlan?.product
  const onTabChange = (tab) => setActiveTab(tab)
  const { toast } = useToast()
  const generateRedirectLink = async (id, priceId) => {
    try {
      if (!authUser || authUser?.isAnonymous) {
        push('/login?redirect=pricing')
        return null
      } else if (
        id !== process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_ID &&
        currentPlan !== id
      ) {
        setloadingStripeCheckout(id)
        const errorHandle = (msg) => {
          setloadingStripeCheckout(false)
          console.error('msg', msg)
        }
        await initiateSubscription(priceId, errorHandle)
        return null
      } else {
        toast({
          variant: 'destructive',
          description: 'You have already Subscribed to this plan',
        })
      }
    } catch (err) {
      setloadingStripeCheckout(false)
      console.error('generateRedirectLink err', err)
    }
  }

  const mappedFeatures = plans.map((plan, index) => {
    const matchedComingSoonFeatures = comingSoonFeatures[index]
    return JSON.parse(plan.stripe_metadata_features?.replace(/'/g, '"')).map(
      (feature) =>
        matchedComingSoonFeatures?.includes(feature)
          ? { feature: feature, status: 'Coming Soon' }
          : { feature: feature, status: 'Available' },
    )
  })
  const mappedPlans = plans.map((plan, index) => ({
    ...plan,
    stripe_metadata_features: mappedFeatures[index],
  }))

  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="py-8 sm:py-16 md:py-20 m-5"
    >
      <div className="md:text-center mt-10 md:mt-16">
        <h2 className="font-semibold text-gray-900 text-5xl">Pricing plans</h2>
        <p className="mt-6 text-xl text-gray-600">
          Simple, transparent pricing that grows with you. Try any plan free for
          30 days
        </p>
      </div>

      <div className="font-semibold text-base flex justify-center	mt-10">
        <div className="flex justify-center gap-x-2 rounded-lg	p-1.5 bg-gray-50 border-solid	border-gray-100 border">
          <div
            onClick={() => onTabChange('month')}
            className={`cursor-pointer text-gray-500 px-3.5 py-2.5 rounded-md flex items-center  ${
              activeTab === 'month' ? 'bg-white shadow text-gray-700' : ''
            }`}
          >
            Monthly billing
          </div>
          <div
            onClick={() => onTabChange('year')}
            className={`cursor-pointer text-gray-500  px-3.5 py-2.5 rounded-md flex flex-col text-center ${
              activeTab === 'year' ? 'bg-white shadow text-gray-700' : ''
            }`}
          >
            <span>Annual billing</span>
            <span className="text-gray-600 text-xs">Save up to 16%</span>
          </div>
        </div>
      </div>
      <div className="-mx-4 mt-16 lg:mt-24 flex  flex-wrap md:flex-nowrap gap-4  sm:mx-auto lg:-mx-auto lg:max-w-none justify-center xl:mx-0 xl:gap-x-8">
        {mappedPlans &&
          mappedPlans.map((plan, index) => {
            return (
              <PricingCard
                key={'pricing_plan' + index}
                activeTab={activeTab}
                plan={plan}
                currentPlan={currentPlan}
                selected={
                  selectedPlan
                    ? selectedPlan === plan?.id
                    : plans[0]?.id === plan?.id
                }
                onSelect={setSelectedPlan}
                generateRedirectLink={generateRedirectLink}
                loadingStripeCheckout={loadingStripeCheckout}
              />
            )
          })}
      </div>
    </section>
  )
}
