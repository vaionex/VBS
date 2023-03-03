import '../globals.css'

export const metadata = {
  description: 'Login or create an account',
  title: 'Login',
}

export default function LoginLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">{children}</body>
    </html>
  )
}
