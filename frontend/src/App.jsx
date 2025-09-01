import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Appliances from './components/Appliances';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      {/* Look towards mobile */}
      <Navbar />
      <Hero />
      
      {/* cards with icons */}
      <Appliances />
      <About />
      {/* FAQ (keep short/use another page) */}

      {/* Upfront prices */}

      {/* <BrandCards /> */}

      {/* <HowItWorks /> */}
      {/* Find testimonial library */}
      <Testimonials />

      {/* <Services /> */}
      <Footer />
    </div>
  );
}

export default App;