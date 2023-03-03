import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Hero from '../../components/Layout/home/hero'
import About from '../../components/Layout/home/about'
import Features from '../../components/Layout/home/features'

const inter = Inter({
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Features />
    </div>
  )
}
