import React from 'react'
import Head from 'next/head'

import RegisterPage from '@/presets/pages/register'
import Layout from '@/presets/layout'

export default function Register() {
  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="" />
        <link rel="icon" href="/vbsLogo.ico" />
      </Head>

      <Layout>
        <RegisterPage />
      </Layout>
    </div>
  )
}
