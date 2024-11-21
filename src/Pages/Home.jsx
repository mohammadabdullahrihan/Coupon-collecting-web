import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee"; // For the marquee effect
import { AuthContext } from "../AuthProvider"; // Import the AuthContext
import data from "/public/data.json"; // Assuming your data is stored here
import banner from '/public/656cbc104c3117db5eee38e2_discover-next-gen-sound-v3-image-techware-x-webflow-template.jpg';
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const { user } = useContext(AuthContext); // Accessing user from context
  const [brandsOnSale, setBrandsOnSale] = useState([]);

  useEffect(() => {
    // Filter brands with isSaleOn as true
    const saleBrands = data.filter(brand => brand.isSaleOn);
    setBrandsOnSale(saleBrands);

    // Initialize AOS for animations
    AOS.init({
      duration: 1000, // Animation duration in ms
      easing: "ease-in-out", // Easing function for animations
      once: true, // Animation occurs only once when the section scrolls into view
    });
  }, []);

  return (
    <div className="space-y-8">
      {/* Banner Section */}
      <div
        className="relative w-[400px] lg:w-[1200px] -ml-[35px] lg:ml-[60px] lg:-mt-[50px]"
        data-aos="fade-up"
      >
        <div>
          <div className="w-full h-full bg-cover bg-center">
            <img className="rounded-[60px]" src={banner} alt="Banner" />
          </div>
        </div>
        <div className="absolute flex flex-col items-center justify-center text-white lg:text-3xl -mt-[250px] lg:-mt-[600px] lg:space-y-[50px]">
          <h1
            data-aos="fade-up"
            className="font-bold text-xl lg:text-7xl text-center space"
          >
            Discover, Save, Enjoy <br /> The Ultimate Coupon Hub!
          </h1>
          <p
            data-aos="fade-up"
            className="lg:text-xl text-sm p-10 lg:p-10"
          >
            Welcome to Discount PRO, your go-to platform for exclusive deals and
            discounts. Explore the best coupons from your favorite brands, save
            big on every purchase, and enjoy a seamless shopping experience.
            Start saving today!
          </p>
        </div>
      </div>

      {user ? (
        <>
          {/* Top Brands Section */}
          <div className="px-4 mt-10">
            <h2 className="text-2xl font-bold mb-4">Top Brands</h2>
            <Marquee speed={30} gradient={false} className="space-x-6">
              {data?.map((brand) => (
                <Link
                  to={`/brands/${brand._id}`}
                  key={brand._id}
                  className="hover:scale-110 transition-all duration-300"
                >
                  <img
                    src={brand.brand_logo}
                    alt={brand.brand_name}
                    className="h-24"
                  />
                </Link>
              ))}
            </Marquee>
          </div>

          {/* Brands on Sale Section */}
          <div className="px-4">
            <h2 className="text-2xl font-bold mb-4">Brands on Sale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {brandsOnSale.map((brand) => (
                <div
                  key={brand._id}
                  className="bg-black p-4 rounded-3xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={brand.brand_logo}
                    alt={brand.brand_name}
                    className="h-[130px] mb-4 mx-auto bg-white p-2 rounded-3xl"
                  />
                  <h3 className="text-xl text-white font-medium">
                    {brand.brand_name}
                  </h3>
                  <p className="text-sm text-white">{brand.category}</p>
                  <p className="text-sm text-white">
                    Total Coupons: {brand.coupons.length}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Coupons Section */}
          <div className="bg-black p-10 rounded-3xl">
            <div className="px-4 text-center">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Featured Coupons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.slice(0, 3).map((brand) => (
                  <div
                    key={brand._id}
                    className="bg-white p-4 rounded-3xl shadow-lg"
                  >
                    <img
                      src={brand.brand_logo}
                      alt={brand.brand_name}
                      className="h-24 mb-4 mx-auto"
                    />
                    <h3 className="text-xl font-semibold">
                      {brand.brand_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Coupon Offer: {brand.coupons[0]?.coupon_code}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shop by Category Section */}
          <div className="px-4">
            <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.map((brand) => (
                <div
                  key={brand._id}
                  className="bg-black p-4 rounded-3xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={brand.brand_logo}
                    alt={brand.brand_name}
                    className="h-[60px] mb-4 mx-auto bg-white p-2 rounded-3xl"
                  />
                  <h3 className="text-xl text-white font-medium">
                    {brand.category}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-lg">Please log in to view content.</p>
      )}
    </div>
  );
};

export default Home;
