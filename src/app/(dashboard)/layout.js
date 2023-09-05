import '../globals.css'
import { Header, Footer } from '@/components/Layout'

export const metadata = {
  description: 'Dashboard',
  title: 'Dashboard',
}

export default function DashboardRootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
