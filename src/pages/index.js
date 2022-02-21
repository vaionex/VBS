import Layout from '@/components/layout'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1 className={styles.title}>
          Welcome to <a href="https://vaionex.com">Vaionex</a>
        </h1>
      </Layout>
    </div>
  )
}