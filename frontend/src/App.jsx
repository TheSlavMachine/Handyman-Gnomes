import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Appliances from './components/Appliances';
import About from './components/About';
import Location from './components/Location';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      {/* Fix mobile */}
      <Navbar />

      <Hero />

      <Appliances />

      <About />

      <Location />
      {/* Get an outline of working zone */}

      <FAQ />
    
      <Testimonials />

      <Footer />
    </div>
  );
}

export default App;