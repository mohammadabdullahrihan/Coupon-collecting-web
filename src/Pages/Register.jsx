import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify'; // For error messages

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Password validation function
  const validatePassword = (password) => {
    const regexUppercase = /[A-Z]/;
    const regexLowercase = /[a-z]/;
    if (!regexUppercase.test(password)) {
      return 'Password must have at least one uppercase letter';
    }
    if (!regexLowercase.test(password)) {
      return 'Password must have at least one lowercase letter';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      navigate('/'); // Redirect to home after successful registration
    } catch (error) {
      toast.error('Registration failed: ' + error.message); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Use the photo URL and display name from Google provider
      const googlePhotoURL = user.photoURL; // Get photo URL from Google profile
      const googleName = user.displayName || name; // Use the name from Google or the entered name

      await updateProfile(user, {
        displayName: googleName,
        photoURL: googlePhotoURL,
      });
      
      navigate('/home'); // Redirect to home after successful Google login
    } catch (error) {
      toast.error('Google registration failed: ' + error.message); // Show error toast
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Photo URL (Optional)</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter your photo URL"
          />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {passwordError && <div className="error">{passwordError}</div>}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
        <div>
          <button type="button" onClick={handleGoogleRegister}>
            Register with Google
          </button>
        </div>
      </form>
      <div>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;
