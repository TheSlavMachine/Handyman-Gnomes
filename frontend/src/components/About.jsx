function About() {
  const brands = ['Samsung', 'LG', 'Whirlpool', 'GE', 'Bosch'];

  return (
    <section className="py-20 px-10 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-12">
        
        {/* Left side text */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-lg sm:text-xl mb-4">
            Sun State works in the greater Phoenix Valley area, providing reliable and affordable home appliance repair services.
          </p>
          <p className="text-lg sm:text-xl mb-4">
            Our experienced technicians handle a wide range of household appliances, making sure your home runs smoothly.
          </p>
          <p className="text-lg sm:text-xl">
            Customer satisfaction is our top priority — fast, friendly, and professional service every time.
          </p>
        </div>

        {/* Right side brands box */}
        <div className="md:w-1/2 bg-white p-6 rounded shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-center">We cover these brands</h3>
          <ul className="text-lg sm:text-xl space-y-2 text-center">
            {brands.map((brand) => (
              <li key={brand} className="font-medium">{brand}</li>
            ))}
            <li className="font-medium">and more...</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default About;