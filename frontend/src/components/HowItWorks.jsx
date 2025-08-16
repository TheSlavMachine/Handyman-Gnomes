function Step({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-2 font-bold">
        {number}
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Schedule a Service", description: "Call us or fill out our online form to book your service." },
    { title: "We Arrive on Time", description: "Our handyman arrives promptly at your location with all necessary tools." },
    { title: "Job Completed", description: "We finish the work efficiently and ensure everything meets your expectations." },
  ];

  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s, index) => (
          <Step key={index} number={index + 1} title={s.title} description={s.description} />
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;