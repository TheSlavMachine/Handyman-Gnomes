// src/App.jsx

// We no longer need useState or any Dialog/Wizard components here.
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Appliances from './components/Appliances';
import About from './components/About';
import Location from './components/Location';
import FAQ from './components/FAQ';

function App() {
  // All state management has been removed. This is now a simple page component.
  return (
    <div className="font-sans">
      {/* The onScheduleClick prop is removed, as the buttons are now simple links. */}
      <Navbar />
      <Hero />

      <HowItWorks />

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