import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Author = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);

  useEffect(() => {
    // Fetch posts authored by the current user
    const unsubscribePosts = firestore
      .collection('posts')
      .where('author', '==', auth.currentUser.email)
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

    // Fetch connection requests for the current user
    const unsubscribeConnectionRequests = firestore
      .collection('connectionRequests')
      .where('authorId', '==', auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        setConnectionRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

    // Cleanup function to unsubscribe from Firestore listeners
    return () => {
      unsubscribePosts();
      unsubscribeConnectionRequests();
    };
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection('posts').add({
        title,
        content,
        author: auth.currentUser.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), // Use the firebase.firestore.FieldValue.serverTimestamp() method
      });
      setTitle('');
      setContent('');
      console.log('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const acceptConnectionRequest = async (requestId) => {
    try {
      // Accept the connection request
      await firestore.collection('connectionRequests').doc(requestId).update({
        accepted: true,
        acceptedAt: firebase.firestore.FieldValue.serverTimestamp(), // Use the firebase.firestore.FieldValue.serverTimestamp() method
      });
      console.log(`Connection request with ID ${requestId} accepted`);
    } catch (error) {
      console.error('Error accepting connection request:', error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={createPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Create Post</button>
      </form>

      <h2>My Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}

      <h2>Connection Requests</h2>
      {connectionRequests.map((request) => (
        <div key={request.id}>
          <p>From: {request.userId}</p>
          <button onClick={() => acceptConnectionRequest(request.id)}>Accept</button>
        </div>
      ))}
    </div>
  );
};

export default Author;