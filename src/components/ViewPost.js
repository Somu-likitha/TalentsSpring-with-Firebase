import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDocRef = doc(collection(firestore, 'posts'), postId);
        const postSnapshot = await getDoc(postDocRef);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.data();
          const authorEmail = postData.author;

          const authorQuery = query(collection(firestore, 'users'), where('email', '==', authorEmail));
          const authorSnapshot = await getDocs(authorQuery);

          if (authorSnapshot.empty) {
            console.error('Author not found for the given email:', authorEmail);
            setPost({ id: postSnapshot.id, ...postData, authorUsername: 'Anonymous', createdAt: postData.createdAt.toDate() });
          } else {
            const authorData = authorSnapshot.docs[0].data();
            setPost({ id: postSnapshot.id, ...postData, authorUsername: authorData.username || 'Anonymous', createdAt: postData.createdAt.toDate() });
          }
        } else {
          console.error('Post not found for the given postId:', postId);
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      }
    };

    fetchPost();
  }, [postId]);

  const handleEditPost = () => {
    navigate(`/edit-post/${postId}`, { state: post });
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(collection(firestore, 'posts'), postId));
        navigate('/author');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profession: {post.profession}</h2>
      <h3>{post.title}</h3>
      <p>Author: {post.authorUsername}</p>
      <p>Date: {post.createdAt.toDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
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
      <button onClick={handleEditPost}>Edit</button>
      <button onClick={handleDeletePost}>Delete</button>
    </div>
  );
};

export default ViewPost;