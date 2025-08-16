import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <Services />
      <Footer />
    </div>
  );
}

export default App;