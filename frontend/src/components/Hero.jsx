import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative text-center p-12 h-[calc(100vh-72px)] bg-[url('https://jolark.com/wp-content/uploads/2022/06/handyman-business-tools-and-equipment.jpg')] 
    bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/40 to-orange-500/100"></div> {/* overlay */}
      <div className="relative z-10 text-white">
        <h2 className="text-6xl font-bold mb-4">
          Arizona Local Handymen
        </h2>
        <p className="text-3xl mb-6">
          Repairs done right, the first time.
        </p>
        <Link to="/schedule">
          <button className="text-xl mb-2 font-semibold bg-orange-600 text-white px-8 py-3.5 rounded inline-block hover:bg-orange-700 transition">
            Schedule Now
          </button>
        </Link>
        <a href="tel:+1234567890" className="block mt-4 text-md text-white">
          Call Us: (123) 456-7890
        </a>
      </div>
    </section>
  );
}

export default Hero;