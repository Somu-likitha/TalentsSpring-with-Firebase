import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import CreatePost from './CreatePost';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const Author = () => {
  const [authorPosts, setAuthorPosts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuthorPosts = () => {
      if (auth.currentUser) {
        const q = query(
          collection(firestore, 'posts'),
          where('author', '==', auth.currentUser.email)
        );
        const unsubscribe = onSnapshot(q, async (snapshot) => {
          const postsWithAuthorData = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const postData = doc.data();
              const authorEmail = postData.author;
              const authorQuery = query(collection(firestore, 'users'), where('email', '==', authorEmail));
              const authorSnapshot = await getDocs(authorQuery);
              const authorData = authorSnapshot.docs[0]?.data();
              return {
                id: doc.id,
                ...postData,
                authorUsername: authorData?.username || 'Anonymous',
                createdAt: postData.createdAt ? postData.createdAt.toDate() : null,
              };
            })
          );
          setAuthorPosts(postsWithAuthorData);
        });
        return unsubscribe;
      }
    };

    const unsubscribe = unsubscribeAuthorPosts();
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
      {authorPosts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>Profession: {post.profession}</h3>
          <p>Author: {post.authorUsername}</p>
          <p>Date: {post.createdAt ? post.createdAt.toDateString() : 'N/A'}</p>
          <h4>{post.title}</h4>
          <Link to={`/view-post/${post.id}?profession=${post.profession}`}>View Post</Link>
          <button onClick={() => handleEditPost(post)}>Edit</button>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Author;