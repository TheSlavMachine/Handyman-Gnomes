function BrandCards() {
  const brands = [
    'Samsung',
    'LG',
    'Whirlpool',
    'GE',
    'Bosch',
    'KitchenAid',
    'Maytag',
    'Mitsubishi'
  ];

  return (
    <section className="py-8 px-4 bg-gray-100 text-center">
      <h3 className="text-2xl font-bold">Don't see a name? Don't worry</h3>
      <p className="text-lg mb-4">We cover all brands</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {brands.map((brand) => (
          <span
            key={brand}
            className="font-semibold text-lg hover:text-orange-600 transition"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

export default BrandCards;