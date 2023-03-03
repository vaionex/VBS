import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Hero, About, Features } from '../../components/Layout/home'

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
