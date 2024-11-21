import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { data } from "../data"; // Assuming the data is imported

const BrandDetails = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const foundBrand = data.find((b) => b._id === id);
    setBrand(foundBrand || null); // Ensure the brand is found or set null
  }, [id]);

  const copyCouponCode = (couponCode) => {
    navigator.clipboard.writeText(couponCode);
    alert("Coupon code copied!");
  };

  if (!brand) return <div>Loading...</div>;

  return (
    <div className="brand-details">
      <h1>{brand.brand_name}</h1>
      <img
        src={brand.brand_logo || "default-logo.png"}
        alt={brand.brand_name}
      />
      <p>{brand.description || "No description available."}</p>

      <div className="coupons">
        {brand.coupons.map((coupon) => (
          <div className="coupon-card" key={coupon.coupon_code}>
            <p>
              <strong>Code:</strong> {coupon.coupon_code}
            </p>
            <p>{coupon.description}</p>
            <button onClick={() => copyCouponCode(coupon.coupon_code)}>
              Copy Code
            </button>
            <a href={brand.shop_link} target="_blank" rel="noopener noreferrer">
              Use Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDetails;
