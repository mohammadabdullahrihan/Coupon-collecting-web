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

  
      <div className="input__container input__container--variant bg-white rounded-[43px] lg:w-[30em] p-[1em] mx-auto shadow-[5px_5px_100px_#dedede,-5px_-5px_100px_#ffffff]">
  <div className="shadow__input shadow__input--variant blur-[25px] rounded-[30px] bg-[#F3FFF9] opacity-50"></div>
  <input
    type="text"
    name="text"
    className="input__search input__search--variant w-[13em] flex items-center rounded-full outline-none border-none p-[0.8em] text-[1.2em] text-[#002019] bg-transparent placeholder-black placeholder-opacity-70"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search..."
  />
  <button className="input__button__shadow input__button__shadow--variant rounded-[15px] bg-black p-[20px] lg:pr-[200px] ml-[10px] border-none hover:bg-black">
    <svg
      className="pl-[180px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      height="1.5em"
      width="13em"
    >
      <path
        d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
        fillRule="evenodd"
        fill="#FFF"
      ></path>
    </svg>
  </button>
</div>


      {/* Brands Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {filteredBrands.map((brand) => (
          <div
            key={brand._id}
            className="bg-black p-6 rounded-3xl shadow-lg flex flex-col items-center space-y-4 transition-transform hover:scale-105"
          >
            {/* Brand Logo */}
            <img
              src={brand.brand_logo}
              alt={brand.brand_name}
              className="h-[160px] bg-white p-8 rounded-3xl object-contain"
            />

            {/* Brand Name and Rating */}
            <div className="flex items-center space-x-2">
              <span className="text-xl text-white font-semibold">{brand.brand_name}</span>
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
            <p className="text-center text-sm text-white">{brand.description}</p>

            {/* Bouncing Sale Text (if saleIsOn is true) */}
            {brand.saleIsOn && (
              <div className="text-center text-red-500 text-lg animate-bounce">
                Sale is On!
              </div>
            )}

            {/* View Coupons Button */}
            <button
              onClick={() => handleViewCouponsClick(brand._id)}
              className="mt-4 px-6 py-2 bg-white font-bold rounded-lg hover:bg-blue-700 transition-all"
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
