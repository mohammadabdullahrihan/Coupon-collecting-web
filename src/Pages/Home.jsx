import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee"; // For the marquee effect
import { AuthContext } from "../AuthProvider"; // Import the AuthContext
import data from "/public/data.json"; // Assuming your data is stored here
import banner from '/public/656cbc104c3117db5eee38e2_discover-next-gen-sound-v3-image-techware-x-webflow-template.jpg'
const Home = () => {
  const { user, logout } = useContext(AuthContext); // Accessing user from context
  const [brandsOnSale, setBrandsOnSale] = useState([]);

  useEffect(() => {
    // Filter brands with isSaleOn as true
    const saleBrands = data.filter(brand => brand.isSaleOn);
    setBrandsOnSale(saleBrands);
  }, []);

  return (
    <div className="space-y-8">
     
  
        {/* Banner with Slider */}
      <div className="relative w-[1200px] ml-[60px] -mt-[50px]">
        <div className="">
          <div className="w-full h-full bg-cover bg-center">
            <img className='rounded-[60px] ' src={banner} alt="" />
          </div>
        </div>
        <div className="absolute flex flex-col items-center justify-center text-white text-3xl -mt-[600px] space-y-[50px]">
          <h1 className='font-bold text-7xl text-center space'>Discover, Save, Enjoy <br /> The Ultimate Coupon Hub!</h1>

          <p className='text-xl p-10'>Welcome to Discount PRO, your go-to platform for exclusive deals and discounts. Explore the best coupons from your favorite brands, save big on every purchase, and enjoy a seamless shopping experience. Start saving today!</p>
        </div>
      </div>

      {
        user ? 

        <>
         

         
      {/* Top Brands Section */}
      <div className="px-4 mt-10">
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
        </>

        :
        []
      }


    </div>
  );
};

export default Home;
