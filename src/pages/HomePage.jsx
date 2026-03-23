import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import BookingForm from '../components/BookingForm'
import ZoneCoverage from '../components/ZoneCoverage'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Business from '../components/Business'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <BookingForm />
      <ZoneCoverage />
      <Testimonials />
      <Business />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
