/* This example requires Tailwind CSS v2.0+ */
const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  {
    name: 'Material',
    description:
      'Solid walnut base with rare earth magnets and polycarbonate add-ons.',
  },
  { name: 'Dimensions', description: '15" x 3.75" x .75"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  {
    name: 'Includes',
    description:
      'Pen Tray, Phone Tray, Small Tray, Large Tray, Sticky Note Holder',
  },
  {
    name: 'Considerations',
    description:
      'Made from natural materials. Grain and color vary with each item.',
  },
]

export default function Example() {
  return (
    <div className="bg-white">
      <div aria-hidden="true" className="relative">
        <img
          src="https://tailwindui.com/img/ecommerce-images/product-feature-02-full-width.jpg"
          alt=""
          className="w-full h-96 object-center object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white" />
      </div>

      <div className="relative -mt-12 max-w-7xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center lg:max-w-4xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Technical Specifications
          </h2>
          <p className="mt-4 text-gray-500">
            Organize is a system to keep your desk tidy and photo-worthy all day
            long. Procrastinate your work while you meticulously arrange items
            into dedicated trays.
          </p>
        </div>

        <dl className="mt-16 max-w-2xl mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">{feature.name}</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
