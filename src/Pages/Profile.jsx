import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);

  if (!user) {
    return <div className="text-center py-10">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile bg-gray-100 min-h-screen">
      <div className="relative h-48 bg-blue-500">
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold">Welcome, {user.displayName}</h1>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center space-x-6">
            <img
              src={user?.photoURL || '/default-avatar.png'}
              alt="User Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
            <div>
              <p className="text-lg mt-2">Email: {user.email}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                Edit Profile
              </button>
              {editing && (
                <button
                  onClick={() => window.location.href = '/update-profile'}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Update Information
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
