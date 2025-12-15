import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative text-center px-4 md:px-8 lg:px-12 pt-24 md:pt-28 pb-16 md:pb-20 min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] bg-[url('https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/75 to-amber-600/70"></div>
      <div className="relative z-10 text-white max-w-4xl mx-auto">
        <div className="mb-3 md:mb-4">
          <span className="inline-block bg-amber-500 text-slate-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-sm mb-3 md:mb-4">
            ⚡ Same-day appointments available
          </span>
        </div>
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
          Expert Appliance Repair
          <span className="block text-amber-200">You Can Trust</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
          From refrigerators to washing machines, our certified technicians fix it right the first time.
          <span className="block mt-1 md:mt-2 text-amber-100 text-sm md:text-base">Licensed • Insured • Upfront pricing</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8">
          <Link to="/schedule">
            <button className="text-base md:text-lg font-bold bg-amber-500 text-slate-900 px-6 py-3 md:px-10 md:py-4 rounded-lg shadow-lg hover:bg-amber-400 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
              Schedule Repair Now
            </button>
          </Link>
          <a 
            href="tel:+14804579660" 
            className="text-base md:text-lg font-semibold bg-white/10 backdrop-blur-sm border border-white/70 text-white px-6 py-3 md:px-10 md:py-4 rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-200 w-full sm:w-auto"
          >
            Call (480) 457-9660
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/10">
            <div className="text-2xl md:text-3xl mb-1 md:mb-2">🔧</div>
            <h3 className="font-semibold mb-1 text-sm md:text-base">All Brands</h3>
            <p className="text-xs md:text-sm text-amber-100">GE, Whirlpool, Samsung & more</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/10">
            <div className="text-2xl md:text-3xl mb-1 md:mb-2">⚡</div>
            <h3 className="font-semibold mb-1 text-sm md:text-base">Fast Service</h3>
            <p className="text-xs md:text-sm text-amber-100">Same-day and next-day availability</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/10">
            <div className="text-2xl md:text-3xl mb-1 md:mb-2">💯</div>
            <h3 className="font-semibold mb-1 text-sm md:text-base">Pro Care</h3>
            <p className="text-xs md:text-sm text-amber-100">Upfront, no-surprise pricing</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;