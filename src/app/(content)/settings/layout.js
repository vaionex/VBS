import SettingsSideBar from '@/components/Settings/SettingsSidebar'
import Image from 'next/image'

export const metadata = {
  description: 'Manage account settings',
  title: 'Settings | Legaliser',
}

export default function SettingsLayout({ children }) {
  return (
    <main className="my-8 md:my-10  mx-10">
      <div className="py-4 px-6 gap-x-3 flex items-center text-lg">
        <Image
          src="/building.svg"
          alt="Featured Icon"
          width={32}
          height={32}
          className="m-2"
        />
        <h3 className="text-lg font-semibold text-gray-600"> Settings</h3>
      </div>

      <div className="flex gap-6">
        <div className="w-full md:w-[25%]">
          <SettingsSideBar />
        </div>
        <div className="w-full md:w-[75%] border border-gray-200 bg-gray-50 rounded-xl">
          {children}
        </div>
      </div>
    </main>
  )
}
