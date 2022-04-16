/* This example requires Tailwind CSS v2.0+ */
const perks = [
  {
    name: 'Connect 3rd Party Wallets',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
    description:
      'Skip the traditional login process by directly connecting a wallet to your application.',
  },
  {
    name: 'Publish Data to the Blockchain',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-warranty-light.svg',
    description:
      'Give the ownership of data back to the user by allowing them to upload to the Bitcoin blockchain.',
  },
  {
    name: 'Mint Tokens & NFTs',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Easily create onchain digital assets, ranging from stablecoins, to luxury goods and tickets.',
  },
  {
    name: 'Bitcoin micropayments',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'Integrate payments functionality to your application with a few lines of code.',
  },
]

export default function Incentive() {
  return (
    <div className="bg-gray-50">
      <h2 className="sr-only">Our perks</h2>
      <div className="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="max-w-2xl mx-auto px-4 grid grid-cols-1 gap-y-12 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {perks.map((perk) => (
            <div key={perk.name} className="sm:flex">
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <img className="w-28 h-24" src={perk.imageSrc} alt="" />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{perk.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
