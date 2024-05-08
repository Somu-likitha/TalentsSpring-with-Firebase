import React, { useState } from 'react';

const ProfileDetails1 = ({ userData }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  return (
    <>
      <div className="profile-details" onClick={toggleProfileModal}>
        <h3>Profile</h3>
      </div>
      {showProfileModal && (
        <div className="profile-modal">
          <div className="modal-content">
            <span className="close" onClick={toggleProfileModal}>
              &times;
            </span>
            <h3>Profile Details</h3>
            <p>Email: {userData.email}</p>
            <p>Username: {userData.username}</p>
            <p>Gender: {userData.gender}</p>
            <p>Date of Birth: {userData.dob}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetails1;