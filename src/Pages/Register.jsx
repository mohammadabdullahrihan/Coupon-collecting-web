import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For error messages

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    const password = event.target.password.value;
        const terms = event.target.terms.checked
    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    if (!terms) {
      setErrorMessage('You must accept the terms of use.');
      toast.error('Please accept the terms of use.');
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

    // <div className="register-container">
    //   <h2>Register</h2>
    //   <form onSubmit={handleRegister}>
    //     <div>
    //       <label>Name</label>
          // <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
    //     </div>
    //     <div>
    //       <label>Email</label>
    //       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     </div>
    //     <div>
    //       <label>Photo URL (Optional)</label>
    //       <input
    //         type="text"
    //         value={photoURL}
    //         onChange={(e) => setPhotoURL(e.target.value)}
    //         placeholder="Enter your photo URL"
    //       />
    //     </div>
    //     <div>
    //       <label>Password</label>
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     </div>
    //     {passwordError && <div className="error">{passwordError}</div>}
    //     <div>
    //       <button type="submit" disabled={loading}>
    //         {loading ? 'Registering...' : 'Register'}
    //       </button>
    //     </div>
    //     <div>
    //       <button type="button" onClick={handleGoogleRegister}>
    //         Register with Google
    //       </button>
    //     </div>
    //   </form>
    //   <div>
    //     <p>Already have an account? <a href="/login">Login here</a></p>
    //   </div>
    // </div>

    <div>
       <div className="flex justify-center my-16 ">
                <div className="container">
                    <div className="heading">Register</div>
                    <form className="form relative" onSubmit={handleRegister}>
                        {/* Email Input */}

                        <input
                            placeholder="Name"
                            id="name"
                            name="name"
                            type="text"
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            placeholder="Photo-URL"
                            id="photo"
                            name="photo"
                            type="text"
                            className="input"
                            value={photoURL}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            required
                        />

                        <input
                            placeholder="E-mail"
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            value={email}
                             onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Password Input */}
                        <div className="relative">
                            <input
                                placeholder="Password"
                                id="password"
                                name="password"
                                type={passwordVisible ? 'text' : 'password'}
                                className="input"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="btnEye"
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <span className="forgot-password">
                            <a href="#">Forgot Password?</a>
                        </span>

                        <input value="Register" type="submit" className="login-button" />

                        <div className="social-account-container">
                            <span className="title">Or Sign in with</span>
                            <div className="flex-col-1 space-y-3"></div>
                        </div>

                        {/* Terms and Conditions */}
                        <label className="flex cursor-pointer items-center justify-between p-1">
                            <div className="relative inline-block">
                                <input
                                    name="terms" // Make sure the name is set to "terms"
                                    type="checkbox"
                                    className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                                />
                                <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-gray-400 transition-all duration-200 peer-checked:left-7 peer-checked:bg-gray-900"></span>
                            </div>
                            <h1 className="mr-[60px] mb-[7px] font-medium text-[14px]">Accept terms of use</h1>
                        </label>

                        <p className='text-[15px] my-4 '>Already have an account? <Link to={'/login'} >Login Here</Link> </p>
                    </form>
                    <div className="ml-[70px]">


<div className="social-account-container">
    <span className="mx-5 font-semibold">Or Sign in with</span>


    <div className="flex-col-1 space-y-3">



        <button className="button x flex border border-gray-200 py-3 px-[110px] -ml-[70px] rounded-[19px] text-[13px] font-medium google mt-4" onClick={handleGoogleRegister}>
            <svg
                style={{ enableBackground: "new 0 0 512 512" }}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
            >
                <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" style={{ fill: "#FBBB00" }} />
                <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style={{ fill: "#518EF8" }} />
                <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style={{ fill: "#28B446" }} />
                <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" style={{ fill: "#F14336" }} />
            </svg>
            Google
        </button>


        <button onClick={() => signInWithGithub()} class="button x flex border border-gray-200 py-3 px-[77px] -ml-[60px] rounded-[19px] text-[13px] font-medium ">
            <div className="flex">

                <svg className="bg-black w-6 rounded-full mr-2 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        <title>github</title>
                        <rect width="24" height="24" fill="none"></rect>
                        <path
                            d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"
                        ></path>
                    </g>
                </svg>

            </div>
            <h1 className="mt-[2px]">Continue with Github</h1>
        </button>


    </div>
</div>

</div>

                </div>

            </div>



            

    </div>
  );
};

export default Register;
