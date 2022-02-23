import Layout from '@/components/layout'
import MainContent from '@/components/layout/main-content'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>VBS</title>
        <meta name="description" content="" />
        <link rel="icon" href="/vbsLogo.ico" />
      </Head>

      <Layout>
        <MainContent>
          <h1 className={styles.title}>
            Welcome to <a href="https://vaionex.com">Vaionex</a>
          </h1>
        </MainContent>
      </Layout>
    </div>
  )
}
