import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import auth from './fire.init';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  const updateUser = (newName, newPhotoURL) => {
    updateProfile(auth.currentUser, { displayName: newName, photoURL: newPhotoURL })
      .then(() => setUser({ ...auth.currentUser, displayName: newName, photoURL: newPhotoURL }));
  };

  if (loading) return 
  <div class="loader"></div>
  

  return (
    <AuthContext.Provider value={{ user, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
