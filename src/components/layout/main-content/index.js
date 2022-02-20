import PropTypes from 'prop-types'
import Footer from '../elements/footer/footer1.jsx'
import ContentSection from '../elements/contentSection/contentSection2.jsx'
import Testimonial from '../elements/testimonial/testimonial4.jsx'
import Incentive from '../elements/incentive/incentive6.jsx'

const MainContent = ({ children }) => {
  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {children}
            </div>
          </div>
        </div>
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
