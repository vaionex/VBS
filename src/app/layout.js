import '@/styles/globals.css'
import Footer from '@/components/layout/main/footer'
import Header from '@/components/layout/main/header'
import Providers from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Vaionex Base Stack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
