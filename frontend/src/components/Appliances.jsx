// src/components/Appliances.jsx

import { useState, useEffect } from 'react';
import OvenIcon from './icons/OvenIcon';
import FridgeIcon from './icons/FridgeIcon';
import DishwasherIcon from './icons/DishwasherIcon';
import WasherDryerIcon from './icons/WasherDryerIcon';


const iconComponents = {
  "Oven": <OvenIcon className="w-12 h-12" />,
  "Fridge": <FridgeIcon className="w-12 h-12" />,
  "Dishwasher": <DishwasherIcon className="w-12 h-12" />,
  "WasherDryer": <WasherDryerIcon className="w-12 h-12" />,
};

export default function Appliances() {
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    async function fetchAppliances() {
      try {
        const res = await fetch('/api/appliances');
        const data = await res.json();
        setAppliances(data);
      } catch (error) {
        console.error("Failed to fetch appliances:", error);
      }
    }
    fetchAppliances();
  }, []);

  return (
    <section className="flex flex-col items-center py-10 px-4 bg-gray-50">
      <h2 className="text-4xl font-bold text-center">
        We fix <span className="text-orange-600">all</span> appliances and brands
      </h2>
      <p className="text-lg mt-2 mb-6 text-gray-600">
        Ovens, cooktops, microwaves, refrigerators, dishwashers, washers and dryers; We handle it all.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* We now render directly from the data fetched from the API */}
        {appliances.map((app) => (
          <div key={app.name} className="bg-white shadow-md rounded-lg p-6 max-w-sm hover:shadow-lg transition-shadow duration-300">
            <img src={app.image} alt={app.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{app.title}</h3>
              {/* The icon is looked up dynamically */}
              {iconComponents[app.icon]}
            </div>
            <p className="text-gray-600">{app.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}