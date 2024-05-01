import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, doc, deleteDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import CreatePost from './CreatePost';
import { Navigate, useNavigate } from 'react-router-dom';
//import EditPost from './EditPost';

const Author = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribePosts = () => {
      if (auth.currentUser) {
        const q = query(
          collection(firestore, 'posts'),
          where('author', '==', auth.currentUser.email)
        );
        return onSnapshot(q, (snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
      }
    };
    const unsubscribe = unsubscribePosts();
    return unsubscribe;
  }, []);

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const handleEditPost = (post) => {
    navigate(`/edit-post/${post.id}`, { state: post });
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(firestore, 'posts', postId));
    }
  };

  // Check if the user is authenticated
  if (!auth.currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <div>
      <button onClick={toggleCreateModal}>Create Post</button>
      {showCreateModal && <CreatePost onClose={toggleCreateModal} />}
      <h2>Your Blog Posts</h2>
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
          <button onClick={() => handleEditPost(post)}>Edit</button>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
      {/* <EditPost /> */}
    </div>
  );
};

export default Author;