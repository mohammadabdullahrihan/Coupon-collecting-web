import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa'; // For the star icon
import { useNavigate } from 'react-router-dom';
import data from '/public/data.json'; // Assuming the data is stored here
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication functions
import auth from '../fire.init'; // Firebase auth initialization

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(data); // Filtered brands based on search term
  const [user, setUser] = useState(null); // Track logged-in user
  const navigate = useNavigate(); // To handle navigation to the login or brand details page

  // Get Firebase auth instance
  const authInstance = getAuth();

  // Listen for auth state changes and update the user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user); // Set the user state whenever auth state changes
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  // Update filtered brands based on search term
  useEffect(() => {
    const filtered = data.filter((brand) =>
      brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [searchTerm]);

  const handleViewCouponsClick = (brandId) => {
    if (user) {
      navigate(`/brands/${brandId}`); // Redirect to the brand's coupon page
    } else {
      navigate('/login'); // Redirect to login if the user is not logged in
    }
  };

  return (
    <div className="px-4 space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center py-6">All Brands</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for a brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-md"
        />
      </div>

      {/* Brands Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBrands.map((brand) => (
          <div
            key={brand._id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 transition-transform hover:scale-105"
          >
            {/* Brand Logo */}
            <img
              src={brand.brand_logo}
              alt={brand.brand_name}
              className="h-24 w-24 object-contain"
            />

            {/* Brand Name and Rating */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold">{brand.brand_name}</span>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={index < brand.rating ? 'text-yellow-500' : 'text-gray-400'}
                  />
                ))}
              </div>
            </div>

            {/* Brand Description */}
            <p className="text-center text-sm text-gray-600">{brand.description}</p>

            {/* Bouncing Sale Text (if saleIsOn is true) */}
            {brand.saleIsOn && (
              <div className="text-center text-red-500 text-lg animate-bounce">
                Sale is On!
              </div>
            )}

            {/* View Coupons Button */}
            <button
              onClick={() => handleViewCouponsClick(brand._id)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              View Coupons
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
