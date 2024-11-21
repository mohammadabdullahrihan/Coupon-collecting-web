import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate()

  if (!user) {
    return <div className="text-center py-10">Please log in to view your profile.</div>;
  }

  return (

    <div className="profile bg-black container-1 flex rounded-3xl min-h-screen px-[80px] py-[60px] lg:px-[35px] lg:py-[25px]">
  <div className="lg:py-10">
    <div className="bg-white shadow-lg rounded-[30px] lg:p-[100px] flex flex-col lg:-ml-0 -ml-[40px] lg:ml-[140px lg:mt-0 mt-[100px]">
      <div className="items-center m-5 mr-5 lg:mr-0 space-x-6">
        <img
          src={user?.photoURL || '/default-avatar.png'}
          alt="User Profile"
          className= " w-[120px] h-[100px] lg:w-32 lg:h-32 ml-[50px] rounded-full border-4 border-gray-300"
        />
        <div className="flex flex-col">
          <p className="lg:text-xl font-semibold mt-2">Email: {user.email}</p>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 lg:text-xl bg-black text-white px-4 py-4 rounded-full hover:bg-black"
          >
            Edit Profile
          </button>
          {editing && (
            <button
              onClick={() => navigate('/update-profile')}
              className="mt-4 text-xl px-4 py-4 bg-black text-white rounded-full hover:bg-black"
            >
              Update Information
            </button>
          )}
        </div>
      </div>
    </div>
  </div>

  <div className="">
    <div className="w-10 bottom-4 left-4 text-white">
      <h1 className="lg:text-7xl text-4xl font-bold  -ml-[240px] lg:m-10">Welcome, <br /> {user.displayName}</h1>
    </div>
  </div>
</div>


  );
};

export default Profile;
