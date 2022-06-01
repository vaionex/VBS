import Head from 'next/head'

import LoginPage from '@/presets/pages/login'
import Layout from '@/presets/layout'

export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="" />
        <link rel="icon" href="/vbsLogo.ico" />
      </Head>

      <Layout>
        <LoginPage />
      </Layout>
    </div>
  )
}
