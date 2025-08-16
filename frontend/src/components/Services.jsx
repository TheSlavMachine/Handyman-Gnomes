function ServiceCard({ title, description }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="font-bold text-lg">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Services() {
  const services = [
    { title: 'Plumbing', description: 'Leaks, installs, and repairs.' },
    { title: 'Electrical', description: 'Fixtures, wiring, and outlets.' },
    { title: 'Carpentry', description: 'Repairs, furniture, and custom builds.' },
  ];
  return (
    <section className="p-8 grid md:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <ServiceCard key={index} title={service.title} description={service.description} />
      ))}
    </section>
  );
}

export default Services;