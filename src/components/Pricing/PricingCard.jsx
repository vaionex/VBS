import { Button } from '../Common/Button'
import clsx from 'clsx'
import NumberCount from './NumberCount'
import usePricing from './usePricing'

function CheckIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        'h-6 w-6 flex-none fill-current stroke-current',
        className,
      )}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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

  const FREE_PRODUCT_ID =
    process.env.VERCEL_ENV !== 'production'
      ? process.env.NEXT_PUBLIC_DEV_STRIPE_FREE_PRODUCT_ID
      : process.env.NEXT_PUBLIC_STRIPE_FREE_PRODUCT_ID
  return (
    <section
      className={clsx(
        'flex flex-col rounded-3xl px-6 sm:px-8 cursor-pointer',
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
        {priceToShow === 0 ? (
          'Free'
        ) : (
          <>
            $
            <NumberCount key={id + '_numCount'} targetNumber={priceToShow} />
          </>
        )}
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
        onClick={() => generateRedirectLink(id, currentPrice.id)}
        variant={selected ? 'solid' : 'outline'}
        color={selected ? 'white' : 'black'}
        textSize="text-base"
        className="mt-8 ring-gray-300 text-black dark:text-black"
        disabled={
          loadingStripeCheckout ||
          (currentPlan === FREE_PRODUCT_ID && id === FREE_PRODUCT_ID)
        }
      >
        {loadingStripeCheckout === id ? (
          <div
            className="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent rounded-full text-blue-600 "
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : currentPlan === id ? (
          'Current'
        ) : (
          'Get started'
        )}
      </Button>

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
          <li key={`plan_${plan.feature}_${index}`} className="flex">
            <CheckIcon
              className={selected ? WHITE_TEXT_CLASS : GRAY_TEXT_CLASS}
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
  )
}
