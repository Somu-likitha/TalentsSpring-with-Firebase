import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import './styles/User.css';
import NotificationsUser from './NotificationsUser'

const UserFavicon = ({ profileDropdownRef, notificationsDropdownRef }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [sentConnectionRequests, setSentConnectionRequests] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
      setUserData(userDoc.data());
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchConnectionRequests = async () => {
    try {
      const requestsQuery = query(
        collection(firestore, 'connectionRequests'),
        where('authorId', '==', auth.currentUser.uid)
      );
      const requestsSnapshot = await getDocs(requestsQuery);
      const requestsData = await Promise.all(
        requestsSnapshot.docs.map(async (doc) => {
          const userData = await getDoc(doc(firestore, 'users', doc.data().userId));
          const status = doc.data().status || 'pending';
          if (status === 'accepted') {
            const authorData = await getDoc(doc(firestore, 'users', doc.data().authorId));
            return {
              id: doc.id,
              ...doc.data(),
              userEmail: userData.data().email,
              username: userData.data().username,
              phoneNumber: userData.data().phoneNumber,
              authorEmail: authorData.data().email,
              authorPhoneNumber: authorData.data().phoneNumber,
              status,
            };
          } else {
            return {
              id: doc.id,
              ...doc.data(),
              userEmail: userData.data().email,
              username: userData.data().username,
              phoneNumber: userData.data().phoneNumber,
              status,
            };
          }
        })
      );
      setConnectionRequests(requestsData);
    } catch (error) {
      console.error('Error fetching connection requests:', error);
    }
  };

  const fetchSentConnectionRequests = async () => {
    try {
      const sentRequestsSnapshot = await getDocs(
        query(collection(firestore, 'connectionRequests'), where('userId', '==', auth.currentUser.uid))
      );
      const sentRequestsData = await Promise.all(
        sentRequestsSnapshot.docs.map(async (doc) => {
          const authorData = await getDoc(doc(firestore, 'users', doc.data().authorId));
          const status = doc.data().status || 'pending';
          return {
            id: doc.id,
            ...doc.data(),
            authorEmail: authorData.data().email,
            authorUsername: authorData.data().username,
            authorPhoneNumber: authorData.data().phoneNumber,
            status,
          };
        })
      );
      setSentConnectionRequests(sentRequestsData);
    } catch (error) {
      console.error('Error fetching sent connection requests:', error);
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
      fetchConnectionRequests();
      fetchSentConnectionRequests();
    }
  };

  const openProfileWindow = () => {
    const profileWindow = window.open('', '_blank', 'width=800,height=600');
    if (profileWindow) {
      profileWindow.document.write(`
        <html>
          <head>
            <title>User Profile</title>
          </head>
          <body>
            <h1>User Profile</h1>
            <p><strong>Email:</strong> ${userData?.email}</p>
            <p><strong>Username:</strong> ${userData?.username}</p>
            <p><strong>Phone Number:</strong> ${userData?.phoneNumber}</p>
          </body>
        </html>
      `);
    }
  };

  const openNotificationsWindow = () => {
    const notificationsWindow = window.open('', '_blank', 'width=800,height=600');
    if (notificationsWindow) {
      notificationsWindow.document.write(`
        <html>
          <head>
            <title>Notifications</title>
          </head>
          <body>
            <h1>Notifications</h1>
            <h2>Received Connection Requests</h2>
            <ul>
              ${connectionRequests.map(
                (request) => `
                  <li>
                    <p><strong>User:</strong> ${request.username}</p>
                    <p><strong>Status:</strong> ${request.status === 'accepted' ? 'Accepted' : 'Pending'}</p>
                    ${
                      request.status === 'accepted'
                        ? `
                      <p><strong>User Email:</strong> ${request.userEmail}</p>
                      <p><strong>User Phone Number:</strong> ${request.phoneNumber}</p>
                    `
                        : ''
                    }
                  </li>
                `
              ).join('')}
            </ul>
            <h2>Sent Connection Requests</h2>
            <ul>
              ${sentConnectionRequests.map(
                (request) => `
                  <li>
                    <p><strong>Author Username:</strong> ${request.authorUsername}</p>
                    <p><strong>Status:</strong> ${request.status === 'accepted' ? 'Accepted' : 'Pending'}</p>
                    ${
                      request.status === 'accepted'
                        ? `
                      <p><strong>Author Email:</strong> ${request.authorEmail}</p>
                      <p><strong>Author Phone Number:</strong> ${request.authorPhoneNumber}</p>
                    `
                        : ''
                    }
                  </li>
                `
              ).join('')}
            </ul>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="user-favicon-container">
      
      <div className="user-favicon" onClick={toggleDropdown}>
        <span className="material-icons">account_circle</span>
      </div>
      {showDropdown && (
        <div className="dropdown-menu">
          <div
            className="profile-details"
            ref={profileDropdownRef}
            data-dropdown-item="profile"
            onClick={openProfileWindow}
          >
            <h3>Profile</h3>
          </div>
          {/* <div
            className="notifications"
            ref={notificationsDropdownRef}
            data-dropdown-item="notifications"
            onClick={openNotificationsWindow}
          >
            <h3>Notifications</h3>
          </div> */}
          <div> <NotificationsUser /> </div>
          
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserFavicon;


