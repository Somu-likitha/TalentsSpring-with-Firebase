import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, addDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import firebase from 'firebase/compat/app';
import CreatePost from './CreatePost';

const Author = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const unsubscribePosts = onSnapshot(collection(firestore, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    const unsubscribeAuthors = onSnapshot(
      query(collection(firestore, 'users'), where('role', '==', 'author')),
      (snapshot) => {
        setAuthors(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
    return () => {
      unsubscribePosts();
      unsubscribeAuthors();
    };
  }, []);

  const sendConnectionRequest = async (authorId) => {
    try {
      await addDoc(collection(firestore, 'connectionRequests'), {
        userId: auth.currentUser.uid,
        authorId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`Connection request sent to author with ID ${authorId}`);
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };

  return (
    <div>
      <CreatePost />
      <h2>Blog Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.imageURL && <img src={post.imageURL} alt="Post" />}
          {post.fileURL && (
            <a href={post.fileURL} target="_blank" rel="noopener noreferrer">
              View File
            </a>
          )}
          {post.videoURL && (
            <video controls>
              <source src={post.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
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

export default Author;