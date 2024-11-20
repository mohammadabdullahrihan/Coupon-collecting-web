import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const UpdateProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Populate the form with the current user data
    if (user) {
      setName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleUpdate = () => {
    setLoading(true);
    try {
      // Call the updateUser function (synchronously)
      updateUser(name, photoURL);

      // Reset the form fields
      setName('');
      setPhotoURL('');

      // Navigate to the profile page
      navigate('/my-profile', { replace: true });
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-profile bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-700 text-center mb-4">Update Profile</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="photoURL" className="block text-sm text-gray-700">Photo URL</label>
            <input
              type="url"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter photo URL"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            disabled={loading}
            className={`w-full px-4 py-2 mt-4 text-white rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Updating...' : 'Update Information'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
