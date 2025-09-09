function Navbar() {
  return (
    <nav className="bg-orange-600 text-white p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold">
            <a href="#">Sun State Appliance Repair</a>
          </h1>
          <a href="#about" className="hover:underline">About Us</a>
          <a href="#location" className="hover:underline">Location</a>
          <a href="#faq" className="hover:underline">FAQ</a>
          <a href="#reviews" className="hover:underline">Reviews</a>
        </div>
        <button className="bg-white text-orange-600 px-4 py-2 rounded hover:bg-gray-200 transition">
          Schedule Now
        </button>
      </div>
    </nav>
  );
}

export default Navbar;