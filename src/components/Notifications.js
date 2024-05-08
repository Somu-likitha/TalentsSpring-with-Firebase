import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';

const AuthorConnections = () => {
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  const fetchConnectionRequests = async () => {
    try {
      const requestsSnapshot = await getDocs(
        query(
          collection(firestore, 'connectionRequests'),
          where('authorId', '==', auth.currentUser.uid)
        )
      );
      const requests = requestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const userIds = requests.map((request) => request.userId);
      const usersSnapshot = await getDocs(
        query(collection(firestore, 'users'), where('__name__', 'in', userIds))
      );
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConnectionRequests(
        requests.map((request) => ({
          ...request,
          user: usersList.find((user) => user.id === request.userId),
        }))
      );
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching connection requests and users:', error);
    }
  };

  const handleAcceptRequest = async (requestId, userId) => {
    try {
      // Update the user's document to mark the connection as accepted
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        connections: arrayUnion(auth.currentUser.uid),
      });

      // Update the connectionRequests document to mark the request as accepted
      const requestRef = doc(firestore, 'connectionRequests', requestId);
      await updateDoc(requestRef, {
        accepted: true,
      });

      // Refetch the connection requests after accepting
      fetchConnectionRequests();

      console.log(`Accepted connection request with ID ${requestId}`);
    } catch (error) {
      console.error('Error accepting connection request:', error);
    }
  };

  return (
    <div>
      <h2>Connection Requests</h2>
      {connectionRequests.length > 0 ? (
        <ul>
          {connectionRequests.map((request) => (
            <li key={request.id}>
              {request.user ? (
                <>
                  <p>User ID: {request.user.id}</p>
                  <p>User: {request.user.username}</p>
                  <p>Email: {request.user.email}</p>
                  <p>Phone Number: {request.user.phoneNumber}</p>
                  {!request.accepted && (
                    <button onClick={() => handleAcceptRequest(request.id, request.user.id)}>
                      Accept
                    </button>
                  )}
                </>
              ) : (
                <p>User data not found.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No connection requests found.</p>
      )}
    </div>
  );
};

export default AuthorConnections;