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
    <div className="coupon-page flex">
      <ToastContainer />
      <div className="brand-info">
        <img src={brandData.brand_logo} alt={`${brandData.brand_name} Logo`} className="brand-logo" />
        <h2 className='text-7xl font-semibold'>{brandData.brand_name}</h2>
        <p className='text-2xl font-semibold'>Rating: {brandData.rating}</p>
        <p className='text-xl font-medium'>{brandData.description}</p>
      </div>

      <div className="coupons-grid -mt-10">
        {brandData?.coupons?.map((coupon, index) => (
          <div key={index} className="coupon-card text-white space-y-3 bg-black p-5 w-[400px] mt-5 rounded-3xl ml-[160px] ">
            <p><strong>{coupon.description}</strong></p>
            <p>Expires on: {coupon.expiry_date}</p>
            <p>Condition: {coupon.condition}</p>
            <p>Type: {coupon.coupon_type}</p>

            <div className="coupon-actions">
              <CopyToClipboard
                text={coupon.coupon_code}
                onCopy={() => toast.success('Coupon code copied to clipboard!', { position: 'top-center' })}
              >
                <button className="copy-button bg-white px-10 py-2
                 rounded-3xl text-black font-semibold ">Copy Code</button>
              </CopyToClipboard>

              <button className="use-now px-10 py-2 bg-white text-black rounded-3xl ml-5 font-semibold" onClick={() => window.open(brandData.shop_link, '_blank')}>
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
