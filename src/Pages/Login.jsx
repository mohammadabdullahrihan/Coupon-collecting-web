import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Handles login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!'); // Success notification
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      toast.error(`Login failed: ${error.message}`); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  // Handles login with Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      toast.success('Google login successful!'); // Success notification
      navigate('/'); // Redirect to home after successful Google login
    } catch (error) {
      toast.error(`Google login failed: ${error.message}`); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  // Handles navigating to the Forgot Password page with pre-filled email
  const handleForgotPassword = () => {
    navigate('/forget-password', { state: { email } });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            aria-label="Email"
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            aria-label="Password"
          />
        </div>

        {/* Login Button */}
        <div className="form-group">
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="form-group">
          <button
            type="button"
            className="btn-link"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        {/* Google Login */}
        <div className="form-group">
          <button
            type="button"
            className="btn google-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Login with Google'}
          </button>
        </div>
      </form>

      {/* Registration Link */}
      <div className="register-link">
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
