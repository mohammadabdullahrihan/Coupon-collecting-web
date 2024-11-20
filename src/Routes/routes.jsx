import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import CouponPage from "../Components/CouponPage"; // Import CouponPage for brand-specific coupons
import PrivateRoute from "../PrivateRoute"; // Ensure the correct import path
import Brands from "../Components/Brands";
import ForgetPassword from "../components/ForgetPassword"; // Import ForgetPassword
import UpdateProfile from "../Components/UpdateProfile"; // Import UpdateProfile
import MyProfile from "../Pages/Profile"; // Import MyProfile
import ErrorPage from "../Components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />, // Main layout for the app
    children: [
      {
        path: "/",
        element: <Home />, // Home page route
      },
      {
        path: "/login",
        element: <Login />, // Login page route
      },
      {
        path: "/register",
        element: <Register />, // Register page route
      },
      {
        path: "/brands", // Brands page route, protected by PrivateRoute
        element: (
          <PrivateRoute>
            <Brands />
          </PrivateRoute>
        ),
      },
      {
        path: "/brands/:id", // Route for specific brand's coupon page
        element: (
          <PrivateRoute>
            <CouponPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile", // Profile page route, protected by PrivateRoute
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      // New Routes
      {
        path: "/forget-password", // Forget Password route
        element: <ForgetPassword />,
      },
      {
        path: "/update-profile", // Update Profile route
        element: <UpdateProfile />,
      },
      {
        path: "/my-profile", // My Profile route
        element: <MyProfile />,
      },
      {
        path: "*", // Catch-all route for undefined paths
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
