import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRentModal, setShowRentModal] = useState(false);
  const [rentProduct, setRentProduct] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', startDate: '', endDate: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleRentNow = (product) => {
    setRentProduct(product);
    setShowRentModal(true);
  };
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRentSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate payment or booking logic
    alert('Booking confirmed! (Payment integration goes here)');
    setShowRentModal(false);
    setForm({ name: '', email: '', startDate: '', endDate: '' });
  };

  // Group products by brand (case-insensitive)
  const grouped = products.reduce((acc, product) => {
    const brand = (product.brand || 'Other').toUpperCase();
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(product);
    return acc;
  }, {});

  // Sort brands alphabetically and products by name within each brand
  const sortedBrands = Object.keys(grouped).sort();
  sortedBrands.forEach(brand => {
    grouped[brand].sort((a, b) => a.name.localeCompare(b.name));
  });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Collections by Brand</h1>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        sortedBrands.map((brand) => (
          <div key={brand} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary">{brand}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {grouped[brand].map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-between">
                  <img 
                    src={product.imageUrl || 'https://via.placeholder.com/200x140?text=No+Image'} 
                    alt={`${product.name || 'Camera equipment'} - Professional photography gear for rent`} 
                    className="w-full h-32 object-contain mb-3 rounded" 
                  />
                  <div className="text-lg font-bold mb-2 text-dark text-center">{product.name}</div>
                  <button className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold transition" onClick={() => handleRentNow(product)}>Rent Now</button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
      {/* Rental Modal */}
      {showRentModal && rentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowRentModal(false)} aria-label="Close">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">Rent {rentProduct.name}</h2>
            <form onSubmit={handleRentSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
              <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
              <input type="date" name="startDate" value={form.startDate} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
              <input type="date" name="endDate" value={form.endDate} onChange={handleFormChange} className="w-full border rounded px-3 py-2" required />
              <div className="my-2 text-gray-700 text-sm">
                <strong>Summary:</strong><br />
                Product: {rentProduct.name}<br />
                Dates: {form.startDate} to {form.endDate}
              </div>
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold w-full">Confirm & Pay</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
