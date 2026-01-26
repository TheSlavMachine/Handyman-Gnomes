function About() {
  return (
    <section id="about" className="py-12 px-6 md:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-12">
        
        {/* Left side text */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl font-bold mb-6 text-slate-900">About Us</h2>
          <p className="text-lg sm:text-xl mb-4 text-gray-700">
            Sun State serves the greater Phoenix Valley with reliable, affordable appliance repair. We are locally owned, licensed, and insured.
          </p>
          <p className="text-lg sm:text-xl mb-4 text-gray-700">
            Our experienced technicians handle ovens, refrigerators, dishwashers, laundry machines, and more. If something isn't working, schedule a visit and we’ll get it running again.
          </p>
          <p className="text-lg sm:text-xl text-gray-700">
            Customer satisfaction is our priority—clear communication, respectful service, and clean work on every job.
          </p>
        </div>

        {/* Right side brands box */}
        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-semibold mb-4 text-center text-slate-900">Brands we service</h3>
          <ul className="grid grid-cols-3 md:grid-cols-4 gap-4">
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/samsung-8.svg" alt="Samsung logo" className="object-contain object-center w-full h-full" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/lg-1.svg" alt="LG logo" className="object-contain object-center w-full h-full" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/whirlpool-3.svg" alt="Whirlpool logo" className="object-contain object-center w-full h-full scale-125" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.freebiesupply.com/logos/large/2x/general-electric-13-logo-png-transparent.png" alt="GE logo" className="object-contain object-center w-full h-full" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/bosch-1.svg" alt="Bosch logo" className="object-cover object-center w-full h-full" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/thermador.svg" alt="Thermador logo" className="object-cover object-center w-full h-full" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/kitchenaid-logo.svg" alt="KitchenAid logo" className="object-contain object-center w-full h-full" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/maytag-1.svg" alt="Maytag logo" className="object-contain object-center w-full h-full scale-125" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="/VikingLogo.png" alt="Viking logo" className="object-contain object-center w-full h-full" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://upload.wikimedia.org/wikipedia/en/2/29/Sub-Zero_%28logo%29.svg" alt="Sub-Zero logo" className="object-contain object-center w-full h-full" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/kenmore.svg" alt="Kenmore logo" className="object-cover object-center w-full h-full scale-115" />
              </div>
            </li>
            <li>
              <div className="w-full h-12 overflow-hidden">
                <img src="https://cdn.worldvectorlogo.com/logos/miele-1.svg" alt="Miele logo" className="object-cover object-center w-full h-full scale-115" />
              </div>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default About;