// Location.jsx
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import phoenixArea from '../data/real_map.json';

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
    color: '#d97706',
    fillColor: '#fbbf24',
    fillOpacity: 0.45,
    weight: 2,
  };

  return (
    <section id="location" className="py-8 md:py-12 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Service Area
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Trusted appliance repair across the Phoenix Valley
          </p>
        </div>

        {/* Map and Cities Container */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Map container */}
          <div className="lg:w-2/3 relative z-0">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <MapContainer style={{ height: "400px", width: "100%" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON data={phoenixArea} style={geoJsonStyle} />
                <FitBounds geoData={phoenixArea} />
              </MapContainer>
            </div>
          </div>

          {/* Cities We Service */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 h-full">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-3">
                  <span className="text-xl">📍</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Cities We Service</h3>
                <p className="text-sm text-gray-600">Professional repair in these areas</p>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler", "Gilbert"].map((city, index) => (
                  <div key={city} className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors duration-200">
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-semibold mr-3">
                      {index + 1}
                    </div>
                    <span className="text-gray-800 font-medium text-sm">{city}</span>
                    <div className="ml-auto">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-800 text-center">
                  <strong>Same-day service available</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Don't See Your City?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Call us to check if we serve your area!
            </p>
            <a
              href="tel:+14804579660"
              className="inline-flex items-center bg-amber-500 text-slate-900 px-6 py-3 rounded-lg shadow-lg hover:bg-amber-400 transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              <span className="mr-2">📞</span>
              Call (480) 457-9660
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;