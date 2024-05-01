import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import firebase from 'firebase/compat/app';

const Notifications = () => {
  const [connectionRequests, setConnectionRequests] = useState([]);

  useEffect(() => {
    const fetchConnectionRequests = () => {
      const q = query(
        collection(firestore, 'connectionRequests'),
        where('authorId', '==', auth.currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setConnectionRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      return unsubscribe;
    };

    const unsubscribeConnectionRequests = fetchConnectionRequests();
    return () => {
      unsubscribeConnectionRequests();
    };
  }, []);

  const handleAcceptRequest = async (requestId, userId) => {
    try {
      // Update the connectionRequest document with the accepted status
      const connectionRequestRef = doc(firestore, 'connectionRequests', requestId);
      await updateDoc(connectionRequestRef, { accepted: true });

      // Update the user's document to mark the connection as accepted
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        connections: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
      });
      console.log('Accepted connection request with ID' , `${requestId}`);
    } catch (error) {
      console.error('Error accepting connection request:', error);
    }
  };

  return (
    <div className="notifications">
      <h3>Connection Requests</h3>
      {connectionRequests.map((request) => (
        <div key={request.id} className="notification">
          <p>User: {request.userId}</p>
          <button onClick={() => handleAcceptRequest(request.id, request.userId)}>Accept</button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;