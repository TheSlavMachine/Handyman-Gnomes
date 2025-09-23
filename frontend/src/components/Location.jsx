// Location.jsx
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import phoenixArea from '../data/map.json';

function FitBounds({ geoData }) {
  const map = useMap();

  useEffect(() => {
    const geoJsonLayer = L.geoJSON(geoData);
    map.fitBounds(geoJsonLayer.getBounds());
  }, [map, geoData]);

  return null;
}

function Location() {
  const geoJsonStyle = {
    color: 'red',
    fillColor: 'orange',
    fillOpacity: 0.5,
    weight: 2,
  };

  return (
    <section id="location" className="flex flex-col items-center py-10 px-10 bg-white w-full">
      <h2 className="text-4xl font-bold text-center mb-4">
        Location
      </h2>
      <p className="text-lg text-gray-600 text-center mb-8">
        We proudly serve homeowners across the Phoenix Valley.
      </p>

      {/* Map and Cities We Service flex container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl mb-12">
        {/* Map container */}
        <div className="md:w-2/3 mb-8 md:mb-0 md:mr-8 relative z-0">
          <MapContainer
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={phoenixArea} style={geoJsonStyle} />
      <FitBounds geoData={phoenixArea} />
    </MapContainer>
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
      <div className="text-center">
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