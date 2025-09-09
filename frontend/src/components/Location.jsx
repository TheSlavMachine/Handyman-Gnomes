// Location.jsx
function Location() {
  return (
    <section id="location" className="flex flex-col py-12 px-10 bg-white w-full">
      <h2 className="text-3xl font-bold text-left mb-4">
        Location
      </h2>
      <p className="text-lg text-gray-600 text-left mb-8">
        We proudly serve homeowners across the Phoenix Valley.
      </p>

      {/* Map and Cities We Service flex container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl mb-12">
        {/* Map container */}
        <div className="md:w-2/3 mb-8 md:mb-0 md:mr-8">
          <iframe
            title="Service Area Map - Tempe"
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d130652.28439383305!2d-111.95641850933691!3d33.41303292183748!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1757378097496!5m2!1sen!2sus"
            className="w-full h-80 rounded-lg shadow-md"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
        {/* Cities We Service */}
        <div className="md:w-1/3 bg-gray-50 rounded-lg shadow-md p-4 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4 flex justify-center">Cities We Service</h3>
          <ul className="text-gray-800 text-lg flex flex-col items-center gap-2">
            <li>Phoenix</li>
            <li>Scottsdale</li>
            <li>Tempe</li>
            <li>Mesa</li>
            <li>Chandler</li>
            <li>Gilbert</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="">
        <a
          href="tel:+14805551234"
          className="bg-orange-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-orange-700 transition"
        >
          Don't see your city? Call us to check availability!
        </a>
      </div>
    </section>
  );
}

export default Location;