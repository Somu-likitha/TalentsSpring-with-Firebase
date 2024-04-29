import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';

const UserFavicon = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userDoc = await firestore.collection('users').doc(auth.currentUser.uid).get();
      setUserData(userDoc.data());
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      fetchUserData();
    }
  };

  return (
    <div className="user-favicon-container">
      <div className="user-favicon" onClick={toggleDropdown}>
        <span className="material-icons">account_circle</span>
      </div>
      {showDropdown && (
        <div className="dropdown-menu">
          {userData && (
            <div className="profile-details">
              <p>Email: {userData.email}</p>
              <p>Username: {userData.username}</p>
              <p>Gender: {userData.gender}</p>
              <p>Date of Birth: {userData.dob}</p>
            </div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserFavicon;