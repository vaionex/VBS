import React from 'react'
import { CombinedAuthProvider } from '../contexts/authContext'

export const metadata = {
  title: 'Main root of the Project',
  description: 'Main root description of the Project',
}

export default function AppLayout({ children }) {
  return (
    <html lang="en" className={`bg-white`}>
      <body className="flex flex-col">
        <CombinedAuthProvider>{children}</CombinedAuthProvider>
      </body>
    </html>
  )
}
