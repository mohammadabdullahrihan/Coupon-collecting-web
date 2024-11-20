import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee"; // For the marquee effect
import { useState, useEffect } from "react";
import data from "/public/data.json"; // Assuming your data is stored here

const Home = () => {
  const [brandsOnSale, setBrandsOnSale] = useState([]);

  useEffect(() => {
    // Filter brands with isSaleOn as true
    const saleBrands = data.filter(brand => brand.isSaleOn);
    setBrandsOnSale(saleBrands);
  }, []);

  return (
    <div className="space-y-8">
      {/* Banner with Slider */}
      <div className="relative w-full h-96 bg-gray-300">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/slider1.jpg')" }}></div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-3xl">
          <h1>Welcome to Discount PRO</h1>
        </div>
      </div>

      {/* Top Brands Section */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-4">Top Brands</h2>
        <Marquee speed={30} gradient={false} className="space-x-6">
          {data?.map((brand) => (
            <Link to={`/brand/${brand._id}`} key={brand._id} className="hover:scale-110 transition-all duration-300">
              <img src={brand.brand_logo} alt={brand.brand_name} className="h-24" />
            </Link>
          ))}
        </Marquee>
      </div>

      {/* Brands on Sale Section */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-4">Brands on Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandsOnSale.map((brand) => (
            <div key={brand._id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={brand.brand_logo} alt={brand.brand_name} className="h-24 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">{brand.brand_name}</h3>
              <p className="text-sm text-gray-500">{brand.category}</p>
              <p className="text-sm text-gray-500">Total Coupons: {brand.coupons.length}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Section 1: Featured Coupons */}
      <div className="bg-gray-100 py-8">
        <div className="px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Featured Coupons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.slice(0, 3).map((brand) => (
              <div key={brand._id} className="bg-white p-4 rounded-lg shadow-lg">
                <img src={brand.brand_logo} alt={brand.brand_name} className="h-24 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold">{brand.brand_name}</h3>
                <p className="text-sm text-gray-500">Coupon Offer: {brand.coupons[0]?.coupon_code}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Extra Section 2: Categories */}
      <div className="px-4">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="flex space-x-6 overflow-x-auto">
          {["Electronics", "Clothing", "Books", "Furniture"].map((category, index) => (
            <div key={index} className="bg-gray-200 px-4 py-6 rounded-lg flex flex-col items-center w-40">
              <img src="https://via.placeholder.com/100" alt={category} className="h-24 mb-4" />
              <h3 className="font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
