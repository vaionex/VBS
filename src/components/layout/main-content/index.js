import PropTypes from 'prop-types'
import Footer from '../elements/footer/footer1.jsx'
import ContentSection from '../elements/contentSection/contentSection2.jsx'
import Testimonial from '../elements/testimonial/testimonial4.jsx'
import Incentive from '../elements/incentive/incentive6.jsx'
import Hero from '../elements/hero/hero1.jsx'

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
