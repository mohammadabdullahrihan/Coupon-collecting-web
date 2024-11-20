import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); // Access user and loading from context

    // While loading, you can either show a loader or just return null
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner or other UI
    }

    // If user is authenticated, render the children
    if (user) {
        return children;
    }

    // If user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
};

export default PrivateRoute;
