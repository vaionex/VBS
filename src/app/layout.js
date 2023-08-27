import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Toaster } from '@/components/ui/toaster'
export const metadata = {
  title: '#',
  description: '#',
}

export default function AppLayout({ children }) {
  return (
    <html lang="en" className={`bg-white`}>
      <body className="flex flex-col">
        {children}
        <ToastContainer />
        <Toaster />
      </body>
    </html>
  )
}
