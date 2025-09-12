import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="text-center p-12 py-40 bg-gray-100">
      <h2 className="text-5xl font-bold mb-4">Reliable Handyman Help</h2>
      <p className="text-xl mb-6">Repairs done right, the first time.</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded" onClick={() => navigate('/schedule')}>
        Schedule Service
      </button>
    </section>
  );
}

export default Hero;