import { Inter } from 'next/font/google'
import Image from 'next/image'
import styles from './page.module.css'
import Hero from '../../components/Layout/home/hero'

const inter = Inter({
  subsets: ['latin'],
})

export default function Home() {
  return (
     <div> 
      <Hero />
      {/* <About /> */}
      {/* <Features /> */}
     </div>
  )
}
