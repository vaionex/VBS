import ContentSection from './content'
import Testimonial from './testimonial'
import Incentive from './incentive'
import Hero from './hero'

const Home = () => {
  return (
    <main className="flex-1">
      <div>
        <Hero />
        <Incentive />
        <ContentSection />
        <Testimonial />
      </div>
    </main>
  )
}

export default Home
