/* This example requires Tailwind CSS v2.0+ */
export default function Example() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">
        <div className="relative flex">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-center object-cover"
          />
          <div className="relative w-full flex flex-col items-start justify-end bg-black bg-opacity-40 p-8 sm:p-12">
            <h2 className="text-lg font-medium text-white text-opacity-75">
              Self-Improvement
            </h2>
            <p className="mt-1 text-2xl font-medium text-white">
              Journals and note-taking
            </p>
            <a
              href="#"
              className="mt-4 text-sm font-medium text-gray-900 bg-white py-2.5 px-4 rounded-md hover:bg-gray-50"
            >
              Shop now
            </a>
          </div>
        </div>
        <div className="relative flex">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-center object-cover"
          />
          <div className="relative w-full flex flex-col items-start justify-end bg-black bg-opacity-40 p-8 sm:p-12">
            <h2 className="text-lg font-medium text-white text-opacity-75">
              Desk and Office
            </h2>
            <p className="mt-1 text-2xl font-medium text-white">
              Work from home accessories
            </p>
            <a
              href="#"
              className="mt-4 text-sm font-medium text-gray-900 bg-white py-2.5 px-4 rounded-md hover:bg-gray-50"
            >
              Shop now
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
