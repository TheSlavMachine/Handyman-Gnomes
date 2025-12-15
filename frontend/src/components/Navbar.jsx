import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            <Link to="/">Sun State Appliance Repair</Link>
          </h1>
        </div>
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          &#9776;
        </button>
        <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-8 ${isOpen ? "flex" : "hidden"} w-full md:w-auto mt-4 md:mt-0`}>
          <a href="#about" className="hover:text-amber-300 block md:inline-block py-2 md:py-0">
            About Us
          </a>
          <a href="#location" className="hover:text-amber-300 block md:inline-block py-2 md:py-0">
            Location
          </a>
          <a href="#faq" className="hover:text-amber-300 block md:inline-block py-2 md:py-0">
            FAQ
          </a>
          <a href="#reviews" className="hover:text-amber-300 block md:inline-block py-2 md:py-0">
            Reviews
          </a>
          <Link to="/schedule" className="md:ml-4">
            <button className="bg-amber-500 text-slate-900 px-5 py-2 rounded-full font-semibold shadow hover:bg-amber-400 transition w-full md:w-auto">
              Schedule Now
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;