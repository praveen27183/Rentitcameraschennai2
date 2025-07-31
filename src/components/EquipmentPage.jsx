import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { LogOut, User, CalendarDays } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const categories = [
  'All',
  'Camera',
  'Lens',
  'Flash',
  'Tripod',
  'Mic',
  'Gimbal',  
  'Studio Light',
  'Drone',

];

const ratings = [
  { label: 'Any Rating', value: 0 },
  { label: '4.0+', value: 4 },
  { label: '4.5+', value: 4.5 },
  { label: '5.0', value: 5 },
];

const EquipmentPage = ({ user, onLogout }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [rentModalProduct, setRentModalProduct] = useState(null);
  const [rentStartDate, setRentStartDate] = useState('');
  const [rentEndDate, setRentEndDate] = useState('');
  const [rentDays, setRentDays] = useState(1);

  useEffect(() => {
    // Get rental days from URL if available
    const daysFromUrl = searchParams.get('rentalDays');
    if (daysFromUrl && !isNaN(daysFromUrl) && daysFromUrl > 0) {
      setRentDays(parseInt(daysFromUrl, 10));
    }
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      // Set max price dynamically
      const max = response.data.length > 0 ? Math.max(...response.data.map(p => p.price)) : 10000;
      setMaxPrice(max);
      setPriceRange([0, max]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (price) => {
    // Apply discounts for longer rental periods
    let discount = 0;
    if (rentDays >= 5) {
      discount = 0.15; // 15% off for 7+ days
    } else if (rentDays >= 3) {
      discount = 0.1; // 10% off for 3-6 days
    } else if (rentDays >= 2) {
      discount = 0.05; // 5% off for 2 days
    }
    
    const subtotal = price * rentDays;
    const discountedPrice = subtotal * (1 - discount);
    
    return {
      original: subtotal.toFixed(2),
      discounted: discountedPrice.toFixed(2),
      hasDiscount: discount > 0,
      discountPercent: Math.round(discount * 100)
    };
  };

  // Filtering logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = !product.rating || product.rating >= minRating;
    return matchesCategory && matchesPrice && matchesRating;
  });

  // Split products into available and rented
  const availableProducts = filteredProducts.filter(p => p.isAvailable !== false);
  const rentedProducts = filteredProducts.filter(p => p.isAvailable === false);

  // Calculate days and amount when dates change
  useEffect(() => {
    if (rentStartDate && rentEndDate) {
      const start = new Date(rentStartDate);
      const end = new Date(rentEndDate);
      const diff = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
      setRentDays(diff);
    }
  }, [rentStartDate, rentEndDate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Welcome bar and logout button */}
      {user && (
        <div className="bg-[#1A97A9] text-white flex justify-between items-center px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="font-semibold">Welcome, {user.name}</span>
            <span className="text-blue-100">({user.email})</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-[#167a8a] hover:bg-[#0f5a68] text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      )}
   
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Row */}
        <div className="block md:hidden mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-3 py-1.5 text-xs md:px-4 md:py-2 md:text-sm rounded-full border font-medium whitespace-nowrap transition ${selectedCategory === cat ? 'bg-[#1A97A9] text-white border-[#1A97A9]' : 'bg-white text-[#1A97A9] border-[#1A97A9] hover:bg-[#1A97A9] hover:text-white'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Price ≤</span>
              <input
                type="number"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-20 border border-[#1A97A9] rounded px-2 py-1 text-sm focus:ring-[#1A97A9] focus:border-[#1A97A9]"
              />
            </div>
            <div>
              <select
                className="border border-[#1A97A9] rounded px-2 py-1 text-sm focus:ring-[#1A97A9] focus:border-[#1A97A9]"
                value={minRating}
                onChange={e => setMinRating(Number(e.target.value))}
              >
                {ratings.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Desktop Filter Sidebar */}
        <aside className="hidden md:block w-full max-w-xs bg-white rounded-2xl shadow p-6 mb-8 self-start static h-fit">
          <h2 className="text-xl font-bold mb-6 text-[#1A97A9]">Filters</h2>
          {/* Category Filter */}
          <div className="mb-6">
            <div className="font-semibold mb-2 text-[#1A97A9]">Category</div>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#1A97A9]">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="text-[#1A97A9] focus:ring-[#1A97A9]"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Price Range Filter */}
          <div className="mb-6">
            <div className="font-semibold mb-2 text-[#1A97A9]">Price Range (₹/day)</div>
            <div className="flex items-center gap-2">
              <span>₹{priceRange[0]}</span>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="flex-1 accent-[#1A97A9]"
              />
              <span>₹{priceRange[1]}</span>
            </div>
          </div>
          {/* Minimum Rating Filter */}
          <div className="mb-6">
            <div className="font-semibold mb-2 text-[#1A97A9]">Minimum Rating</div>
            <select
              className="w-full border border-[#1A97A9] rounded-lg px-3 py-2 focus:ring-[#1A97A9] focus:border-[#1A97A9]"
              value={minRating}
              onChange={e => setMinRating(Number(e.target.value))}
            >
              {ratings.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </aside>
        {/* Product Grid */}
        <section className="display-flex ">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Available Equipments</h1>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1A97A9]"></div>
            </div>
          ) : availableProducts.length === 0 ? (
            <div className="text-center text-gray-500">No equipment available at the moment.</div>
          ) : (
            <div className="flex flex-row justify-center gap-8 flex-nowrap">

              {availableProducts.map(product => (
                <div key={product._id} className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col border border-[#1A97A9] border-opacity-20 min-w-[280px] max-w-sm w-full">
                  {/* Available badge and heart icon */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center gap-1 bg-[#1A97A9] bg-opacity-10 text-[#1A97A9] text-sm font-semibold px-4 py-2 rounded-full">
                      <svg className="w-4 h-4 text-[#1A97A9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Available
                    </span>
                    <button className="text-gray-400 hover:text-[#1A97A9] p-2 rounded-full hover:bg-gray-50 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                    </button>
                  </div>
                  
                  {/* Product image with category badge */}
                  <div className="relative mb-4 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden" style={{ height: '180px' }}>
                    <img
                      src={product.imageUrl}
                      alt={`${product.name} - Professional camera equipment for rent`}
                      className="h-full w-full object-contain p-2"
                      onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                    />
                    {product.category && (
                      <span className="absolute left-3 top-3 bg-[#1A97A9] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                        {product.category}
                      </span>
                    )}
                  </div>
                  
                  {/* Product name */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">{product.name}</h2>
                  
                  {/* Rating and reviews */}
                  <div className="flex items-center gap-2 text-yellow-500 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                      <span className="font-semibold">4.8</span>
                    </div>
                    <span className="text-gray-500">(124 reviews)</span>
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#1A97A9] bg-opacity-10 text-[#1A97A9] text-xs font-semibold px-3 py-1 rounded-full">45MP Full Frame</span>
                    <span className="bg-[#1A97A9] bg-opacity-10 text-[#1A97A9] text-xs font-semibold px-3 py-1 rounded-full">8K Video</span>
                    <span className="bg-[#1A97A9] bg-opacity-10 text-[#1A97A9] text-xs font-semibold px-3 py-1 rounded-full">+1 more</span>
                  </div>
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <svg className="w-4 h-4 text-[#1A97A9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                    <span>KK Nagar</span>
                  </div>
                  
                  {/* Price section - Enhanced */}
                  <div className="bg-[#1A97A9] bg-opacity-5 rounded-xl p-4 mb-4">
                    <div className="text-[#1A97A9] font-bold text-3xl mb-1">
                      ₹{product.price} 
                      <span className="text-lg font-normal text-gray-500 ml-1">/day</span>
                    </div>
                    <div className="text-sm text-gray-500">Available for selected dates</div>
                  </div>
                  
                  {/* Action buttons - Enhanced */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <button className="w-full bg-white border-2 border-[#1A97A9] text-[#1A97A9] font-semibold py-3 rounded-xl hover:bg-[#1A97A9] hover:text-white transition-all duration-200">
                      View Details
                    </button>
                    <button
                      className="w-full bg-[#1A97A9] hover:bg-[#167a8a] text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg"
                      onClick={() => {
                        setRentModalProduct(product);
                        setRentStartDate('');
                        setRentEndDate('');
                        setRentDays(1);
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-lg font-bold mb-1">
                          ₹{calculateTotalPrice(product.price).discounted}
                          {calculateTotalPrice(product.price).hasDiscount && (
                            <span className="text-sm text-gray-200 line-through ml-2">
                              ₹{calculateTotalPrice(product.price).original}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-100 flex items-center">
                          <CalendarDays className="w-4 h-4 mr-1" />
                          {rentDays} {rentDays === 1 ? 'day' : 'days'} rental
                          {calculateTotalPrice(product.price).hasDiscount && (
                            <span className="ml-2 text-green-200 font-medium">
                              {calculateTotalPrice(product.price).discountPercent}% off
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rent Now Modal */}
          {rentModalProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                  onClick={() => setRentModalProduct(null)}
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-2xl font-bold text-center mb-6">Rent {rentModalProduct.name}</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Start Date</label>
                    <input
                      type="date"
                      className="border rounded-lg px-3 py-2 w-full"
                      value={rentStartDate}
                      onChange={e => setRentStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">End Date</label>
                    <input
                      type="date"
                      className="border rounded-lg px-3 py-2 w-full"
                      value={rentEndDate}
                      onChange={e => setRentEndDate(e.target.value)}
                      min={rentStartDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Number of Days:</span>
                    <span className="font-bold text-lg">{rentDays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Rate per Day:</span>
                    <span className="font-bold text-lg">₹{rentModalProduct.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Amount:</span>
                    <span className="font-bold text-[#1A97A9] text-xl">₹{rentModalProduct.price * rentDays}</span>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      className="flex-1 bg-[#1A97A9] hover:bg-[#167a8a] text-white font-semibold py-2 rounded-lg transition"
                      onClick={() => alert('Booking functionality coming soon!')}
                      disabled={!rentStartDate || !rentEndDate}
                    >
                      Confirm Rent
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition"
                      onClick={() => setRentModalProduct(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Rented Equipments Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-16 mb-8 text-center">Rented Out Equipments</h2>
          {loading ? null : rentedProducts.length === 0 ? (
            <div className="text-center text-gray-500">No equipment is currently rented out.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {rentedProducts.map(product => (
                <div key={product._id} className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col border border-gray-200 min-w-[220px] max-w-xs w-full opacity-80">
                  {/* Out for Rent badge and heart icon */}
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      Out for Rent
                    </span>
                    <button className="text-gray-300 hover:text-[#1A97A9] p-1 rounded-full">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                    </button>
                  </div>
                  {/* Product image with category badge */}
                  <div className="relative mb-3 flex items-center justify-center bg-gray-50 rounded-xl" style={{ height: '150px' }}>
                    <img
                      src={product.imageUrl}
                      alt={`${product.name} - Professional camera equipment for rent`}
                      className="h-full w-full object-contain"
                      onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                    />
                    {product.category && (
                      <span className="absolute left-2 top-2 bg-[#1A97A9] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {product.category}
                      </span>
                    )}
                  </div>
                  {/* Product name */}
                  <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{product.name}</h2>
                  {/* Mock rating and reviews */}
                  <div className="flex items-center gap-1 text-yellow-500 text-sm mb-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                    <span className="font-semibold">4.8</span>
                    <span className="text-gray-500">(124 reviews)</span>
                  </div>
                  {/* Mock features */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-[#1A97A9] bg-opacity-10 text-[#1A97A9] text-xs font-semibold px-2 py-1 rounded-full">45MP Full Frame</span>
                    <span className="bg-[#1A97A9] bg-opacity-10 text-[#1A97A9] text-xs font-semibold px-2 py-1 rounded-full">8K Video</span>
                    <span className="bg-[#1A97A9] bg-opacity-10 text-[#1A97A9] text-xs font-semibold px-2 py-1 rounded-full">+1 more</span>
                  </div>
                  {/* Mock location */}
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <svg className="w-4 h-4 text-[#1A97A9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                    KK Nagar
                  </div>
                  {/* Price per day */}
                  <div className="text-[#1A97A9] font-bold text-2xl mb-1">₹{product.price} <span className="text-base font-normal text-gray-500">/day</span></div>
                  <div className="text-xs text-gray-400 mb-2">{product.rentedUntil ? `Rented until: ${new Date(product.rentedUntil).toLocaleDateString()}` : 'Currently unavailable'}</div>
                  {/* Action buttons */}
                  <div className="flex gap-2 mt-auto">
                    <button className="flex-1 bg-white border border-[#1A97A9] text-[#1A97A9] font-semibold py-2 rounded-lg hover:bg-[#1A97A9] hover:text-white transition" disabled>View Details</button>
                    <button
                      className="flex-1 bg-gray-300 text-white font-semibold py-2 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EquipmentPage; 