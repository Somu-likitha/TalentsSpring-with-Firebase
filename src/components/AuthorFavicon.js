// AuthorFavicon.js
import React, { useState, useEffect } from 'react';
//import { collection, doc, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import './AuthorFavicon.css';
import ProfileDetails1 from './ProfileDetails1';
import Notifications from './Notification';

const AuthorFavicon = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userDoc = await firestore.collection('users').doc(auth.currentUser.uid).get();
      setUserData(userDoc.data());
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (showDropdown && auth.currentUser) {
      fetchUserData();
    }
  }, [showDropdown, auth.currentUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Navigate to sign-in page or perform any other necessary actions
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="author-favicon-container">
      <div className="author-favicon" onClick={toggleDropdown}>
        <span className="material-icons">account</span>
      </div>
      {showDropdown && (
        <div className="dropdown-menu">
          {userData && <ProfileDetails1 userData={userData} />}
          <Notifications authorId={auth.currentUser.uid} /> {/* Pass the authorId prop */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AuthorFavicon;