import Head from 'next/head'

import Layout from '@/components/layout'
import HomePage from '@/components/pages/home'

export default function Home() {
  return (
    <div>
      <Head>
        <title>VBS</title>
        <meta name="description" content="" />
        <link rel="icon" href="/vbsLogo.ico" />
      </Head>

      <Layout>
        <HomePage />
      </Layout>
    </div>
  )
}
