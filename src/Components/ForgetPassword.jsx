import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ForgetPassword = () => {
  const location = useLocation(); // To get the pre-filled email from the previous route
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || ''); // Pre-fill email if available

  const handleResetPassword = () => {
    window.open('https://mail.google.com', '_blank'); // Open Gmail
    navigate('/login'); // Redirect to login page after reset
  };

  return (
    <div className="forget-password">
      <h2>Reset Password</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
