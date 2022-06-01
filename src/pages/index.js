import Head from 'next/head'

import Layout from '@/presets/layout'
import HomePage from '@/presets/pages/home'

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
