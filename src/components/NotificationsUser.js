import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

const NotificationsUser = () => {
  const [authorDetails, setAuthorDetails] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchAuthorDetails();
  }, []);

  const fetchAuthorDetails = async () => {
    try {
      const connectionRequestsSnapshot = await getDocs(
        query(
          collection(firestore, 'connectionRequests'),
          where('userId', '==', auth.currentUser.uid),
          where('accepted', '==', true)
        )
      );
      const acceptedRequests = connectionRequestsSnapshot.docs.map((doc) => doc.data());
      const authorIds = acceptedRequests.map((request) => request.authorId);
      const usersSnapshot = await getDocs(query(collection(firestore, 'users'), where('__name__', 'in', authorIds)));
      const authorDetails = usersSnapshot.docs.map((doc) => ({
        authorId: doc.id,
        username: doc.data().username,
        email: doc.data().email,
        phoneNumber: doc.data().phoneNumber,
      }));
      setAuthorDetails(authorDetails);
    } catch (error) {
      console.error('Error fetching author details:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <h2>Author Details</h2>
      <button onClick={toggleDropdown}>Show Author Details</button>
      {showDropdown && (
        <div className="dropdown">
          {authorDetails.length > 0 ? (
            <ul>
              {authorDetails.map((author, index) => (
                <li key={index}>
                  <p>Author ID: {author.authorId}</p>
                  <p>Username: {author.username}</p>
                  <p>Email: {author.email}</p>
                  <p>Phone Number: {author.phoneNumber}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No author details found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsUser;