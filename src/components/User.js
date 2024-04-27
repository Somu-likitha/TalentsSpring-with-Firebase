import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const User = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Fetch blog posts from Firestore
    const unsubscribePosts = firestore.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch authors from Firestore
    const unsubscribeAuthors = firestore
      .collection('users')
      .where('role', '==', 'author')
      .onSnapshot((snapshot) => {
        setAuthors(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

    // Cleanup function to unsubscribe from Firestore listeners
    return () => {
      unsubscribePosts();
      unsubscribeAuthors();
    };
  }, []);

  const sendConnectionRequest = async (authorId) => {
    try {
      // Send a connection request to the author
      await firestore.collection('connectionRequests').add({
        userId: auth.currentUser.uid,
        authorId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Use the firebase.firestore.FieldValue.serverTimestamp() method
      });
      console.log(`Connection request sent to author with ID ${authorId}`);
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
        </div>
      ))}

      <h2>Authors</h2>
      {authors.map((author) => (
        <div key={author.id}>
          <p>{author.email}</p>
          <button onClick={() => sendConnectionRequest(author.id)}>Connect</button>
        </div>
      ))}
    </div>
  );
};

export default User;