import SharedLayout from '@/components/layout/shared-layout'
import ContentSection from './content'
import Testimonial from './testimonial'
import Incentive from './incentive'
import Hero from './hero'

const Home = () => {
  return (
    <SharedLayout title="Home">
      <Hero />
      <Incentive />
      <ContentSection />
      <Testimonial />
    </SharedLayout>
  )
}

export default Home
