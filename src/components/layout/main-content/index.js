import PropTypes from 'prop-types'
import Footer from '../elements/footer/footer1'
import ContentSection from '../elements/contentSection/contentSection2'
import Testimonial from '../elements/testimonial/testimonial4'
import Incentive from '../elements/incentive/incentive6'
import Hero from '../elements/marketing/hero/hero1'

const MainContent = ({ children }) => {
  return (
    <main className="flex-1">
      <div>
        <Hero />
        <Incentive />
        <ContentSection />
        <Testimonial />
        <Footer />
      </div>
    </main>
  )
}

MainContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainContent
