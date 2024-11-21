import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);

  if (!user) {
    return <div className="text-center py-10">Please log in to view your profile.</div>;
  }

  return (
    <div className="profile container-1 flex rounded-3xl min-h-screen">


      <div className="py-10">
        <div className="bg-white shadow-lg rounded-[100px] p-[100px] flex flex-col ml-[140px]">
          <div className=" items-center space-x-6">
            <img
              src={user?.photoURL || '/default-avatar.png'}
              alt="User Profile"
              className="w-32 h-32 ml-[90px] rounded-full border-4 border-gray-300"
            />
            <div className='flex flex-col'>
              <p className="text-xl font-semibold mt-2 ">Email: {user.email}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 text-xl bg-black text-white px-4 py-4 rounded-full hover:black"
              >
                Edit Profile
              </button>
              {editing && (
                <button
                  onClick={() => window.location.href = '/update-profile'}
                  className="mt-4 text-xl px-4 py-4 bg-black text-white rounded-full hover:black"
                >
                  Update Information
                </button>
              )}
            </div>
          </div>
        </div>
              </div>

      <div className="">
        <div className=" w-10 bottom-4 left-4 text-white">
          <h1 className="text-8xl font-bold m-10 w-">Welcome, {user.displayName}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
