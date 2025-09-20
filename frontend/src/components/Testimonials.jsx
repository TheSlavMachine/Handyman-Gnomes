function TestimonialCard({ name, text }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <p className="italic mb-2">"{text}"</p>
      <p className="font-bold text-right">- {name}</p>
    </div>
  );
}

function Testimonials() {
  const reviews = [
    { name: "Alice", text: "Fast, friendly, and reliable. Highly recommend!" },
    { name: "Bob", text: "The handyman fixed my leak the same day. Excellent service." },
    { name: "Charlie", text: "Professional and trustworthy. Will hire again." },
  ];

  return (
    <section className="p-6 py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">What Our Customers Say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <TestimonialCard key={r.name} name={r.name} text={r.text} />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;