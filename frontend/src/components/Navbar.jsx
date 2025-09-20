import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-600 text-white p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">
            <a href="#">Sun State Appliance Repair</a>
          </h1>
        </div>
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
        <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 ${isOpen ? "flex" : "hidden"} w-full md:w-auto`}>
          <a href="#about" className="hover:underline block md:inline-block py-2 md:py-0">
            About Us
          </a>
          <a href="#location" className="hover:underline block md:inline-block py-2 md:py-0">
            Location
          </a>
          <a href="#faq" className="hover:underline block md:inline-block py-2 md:py-0">
            FAQ
          </a>
          <a href="#reviews" className="hover:underline block md:inline-block py-2 md:py-0">
            Reviews
          </a>
          <button className="bg-white text-orange-600 px-4 py-2 rounded hover:bg-gray-200 transition mt-2 md:mt-0 md:ml-4 w-full md:w-auto">
            Schedule Now
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;