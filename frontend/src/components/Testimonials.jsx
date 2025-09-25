function TestimonialCard({ name, text, location, rating }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="flex text-orange-400 text-lg">
          {[...Array(rating)].map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
      </div>
      <blockquote className="text-gray-700 mb-4 leading-relaxed">
        "{text}"
      </blockquote>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg mr-3">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const reviews = [
    { 
      name: "Sarah Johnson", 
      text: "My refrigerator stopped working on a Sunday morning. They came out the same day and had it running perfectly within an hour. Outstanding service!", 
      location: "Phoenix, AZ",
      rating: 5
    },
    { 
      name: "Mike Rodriguez", 
      text: "Professional, punctual, and fair pricing. Fixed our washing machine quickly and explained everything clearly. Highly recommend!", 
      location: "Scottsdale, AZ",
      rating: 5
    },
    { 
      name: "Jennifer Chen", 
      text: "Excellent work on our dishwasher repair. The technician was knowledgeable and provided a 2-year warranty. Great peace of mind!", 
      location: "Tempe, AZ",
      rating: 5
    },
  ];

  return (
    <section id="reviews" className="py-12 md:py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real reviews from satisfied customers across the Phoenix Valley
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <TestimonialCard 
              key={r.name} 
              name={r.name} 
              text={r.text} 
              location={r.location}
              rating={r.rating}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-orange-50 rounded-lg px-6 py-4 border border-orange-200">
            <div className="flex items-center text-orange-600 mr-4">
              <span className="text-2xl mr-2">⭐</span>
              <span className="text-xl font-bold">4.9/5</span>
            </div>
            <div className="text-gray-700">
              <p className="font-semibold">Excellent Rating</p>
              <p className="text-sm">Based on 200+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;