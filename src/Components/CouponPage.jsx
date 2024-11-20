import React, { useEffect, useState, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../AuthProvider';

const CouponPage = () => {
  const { id } = useParams(); // Get brand ID from the route
  const { user } = useContext(AuthContext); // Check user authentication
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {

        const filteredData = data?.find((brand) => brand._id === id);
        setBrandData(filteredData)
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  // Redirect if the user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Display a message if no data is available
  if (!brandData) {
    return <p>Loading brand data...</p>;
  }

  return (
    <div className="coupon-page">
      <ToastContainer />
      <div className="brand-info">
        <img src={brandData.brand_logo} alt={`${brandData.brand_name} Logo`} className="brand-logo" />
        <h2>{brandData.brand_name}</h2>
        <p>Rating: {brandData.rating}</p>
        <p>{brandData.description}</p>
      </div>

      <div className="coupons-grid">
        {brandData?.coupons?.map((coupon, index) => (
          <div key={index} className="coupon-card">
            <p><strong>{coupon.description}</strong></p>
            <p>Expires on: {coupon.expiry_date}</p>
            <p>Condition: {coupon.condition}</p>
            <p>Type: {coupon.coupon_type}</p>

            <div className="coupon-actions">
              <CopyToClipboard
                text={coupon.coupon_code}
                onCopy={() => toast.success('Coupon code copied to clipboard!', { position: 'top-center' })}
              >
                <button className="copy-button">Copy Code</button>
              </CopyToClipboard>

              <button className="use-now" onClick={() => window.open(brandData.shop_link, '_blank')}>
                Use Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponPage;
