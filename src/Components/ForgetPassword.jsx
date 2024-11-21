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
    <div>


<div class="form-container flex lg:ml-[500px]">
      <div class="logo-container">
        Forgot Password
      </div>

      <form class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className=''
          required
        />
        </div>

        <button class="form-submit-btn"  onClick={handleResetPassword} type="submit">Reset Password</button>
      </form>


    </div>

    </div>
  );
};

export default ForgetPassword;
