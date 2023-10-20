'use client'
import { useState } from 'react'
import clsx from 'clsx'
import usePricing from './usePricing'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../UI/button'
import { PriceDisplay } from './PriceDisplay'
import { ButtonContent } from './ButtonContent'
import CancelMemberShip from './CancelMemberShip'
const WHITE_TEXT_CLASS = 'text-white'
const GRAY_TEXT_CLASS = 'text-gray-600'

export default function PricingCard({
  onSelect,
  selected = false,
  plan,
  generateRedirectLink,
  loadingStripeCheckout,
  currentPlan,
  activeTab,
}) {
  const [open, setOpen] = useState(false)
  const {
    id,
    stripe_metadata_title,
    stripe_metadata_description,
    stripe_metadata_features,
  } = plan
  const [
    currentPrice,
    monthlyPrice,
    priceToShow,
    calculatedSavedAmountInPercentage,
  ] = usePricing(plan, activeTab)

  return (
    <>
      <section
        className={clsx(
          'flex flex-col rounded-3xl px-6 sm:px-8 cursor-pointer w-[330px]',
          selected ? 'bg-blue-600 py-8 lg:order-none' : 'lg:py-8',
        )}
        onClick={() => onSelect(id)}
      >
        <h3
          className={clsx(
            'mt-5 font-semibold text-lg ',
            selected ? WHITE_TEXT_CLASS : GRAY_TEXT_CLASS,
          )}
        >
          {stripe_metadata_title}
        </h3>
        <span
          className={clsx(
            'mt-4 text-6xl font-semibold tracking-tight',
            selected ? WHITE_TEXT_CLASS : 'text-gray-900',
          )}
        >
          <PriceDisplay priceToShow={priceToShow} id={id} />
          <span
            className={clsx(
              'mt-4 ml-2 font-display text-base font-medium tracking-tight',
              selected ? WHITE_TEXT_CLASS : GRAY_TEXT_CLASS,
            )}
          >
            {monthlyPrice && (
              <span className="absolute text-2xl line-through">
                ${monthlyPrice}
              </span>
            )}
            per month.
          </span>
          {monthlyPrice && (
            <span
              className={`${
                selected ? WHITE_TEXT_CLASS : GRAY_TEXT_CLASS
              } text-sm font-normal ml-1 tracking-normal`}
            >
              Save {calculatedSavedAmountInPercentage}%
            </span>
          )}
        </span>

        <p
          className={clsx(
            'mt-6 text-base',
            selected ? WHITE_TEXT_CLASS : GRAY_TEXT_CLASS,
          )}
        >
          {stripe_metadata_description}
        </p>
        <Button
          onClick={() => generateRedirectLink(id, currentPrice?.id)}
          variant={selected ? 'solid' : 'outline'}
          color={selected ? 'white' : 'black'}
          textSize="text-base"
          className="mt-8 ring-gray-300 text-black bg-gradient-to-br from-white to-white rounded-full focus-visible:bg-white"
          disabled={
            currentPlan === process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_ID
          }
        >
          <ButtonContent
            loadingStripeCheckout={loadingStripeCheckout}
            currentPlan={currentPlan}
            id={id}
          />
        </Button>
        {currentPlan === id && (
          <Button
            className="mt-2 bg-gradient-to-br from-[#F04438] to-[#F04438] rounded-full"
            onClick={() => {
              setOpen(true)
            }}
          >
            Cancel Membership
          </Button>
        )}
        <ul
          role="list"
          className={clsx(
            'mt-8 flex flex-col gap-y-3 text-base',
            selected ? WHITE_TEXT_CLASS : 'text-slate-200',
          )}
        >
          <p
            className={clsx(
              'font-semibold',
              selected ? WHITE_TEXT_CLASS : 'text-gray-900',
            )}
          >
            FEATURES
          </p>
          {stripe_metadata_features.map((plan, index) => (
            <li
              key={`plan_${plan.feature}_${index}`}
              className="flex items-center"
            >
              <CheckCircle2
                className={`h-5 w-5 ${
                  selected ? WHITE_TEXT_CLASS : GRAY_TEXT_CLASS
                }`}
              />
              <span
                className={`ml-4 mt-[2px] ${
                  selected ? WHITE_TEXT_CLASS : GRAY_TEXT_CLASS
                }`}
              >
                {plan?.feature}
              </span>
            </li>
          ))}
        </ul>
      </section>
      {open && <CancelMemberShip open={open} setOpen={setOpen} />}
    </>
  )
}
