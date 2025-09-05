function Navbar() {
  return (
    <nav className="bg-orange-600 text-white p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Sun State Appliance Repair
        </h1>
        <button className="bg-white text-orange-600 px-4 py-2 rounded hover:bg-gray-200 transition">
          Schedule Now
        </button>
      </div>
    </nav>
  );
}

export default Navbar;