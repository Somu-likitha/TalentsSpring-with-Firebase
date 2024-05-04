import React, { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { useSearchParams, useNavigate } from 'react-router-dom';

const User = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchParams] = useSearchParams();
  const [sentConnectionRequests, setSentConnectionRequests] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostsAndAuthors = async () => {
      const profession = searchParams.get('profession');

      const unsubscribePosts = onSnapshot(
        query(
          collection(firestore, 'posts'),
          profession ? where('profession', '==', profession) : null
        ),
        (snapshot) => {
          const fetchedPosts = snapshot.docs.map(async (doc) => {
            const authorEmail = doc.data().author;
            const authorQuery = query(
              collection(firestore, 'users'),
              where('email', '==', authorEmail)
            );
            const authorSnapshot = await getDocs(authorQuery);
            const authorData = authorSnapshot.docs[0]?.data();
            return {
              id: doc.id,
              ...doc.data(),
              authorUsername: authorData?.username || 'Anonymous',
              createdAt: doc.data().createdAt.toDate(),
            };
          });
          Promise.all(fetchedPosts).then((posts) => setPosts(posts));
        }
      );

      const unsubscribeAuthors = onSnapshot(
        collection(firestore, 'users'),
        (snapshot) => {
          setAuthors(
            snapshot.docs
              .filter((doc) => doc.data().role === 'author')
              .map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      );

      const unsubscribeSentRequests = () => {
        if (auth.currentUser) {
          const unsubscribe = onSnapshot(
            query(
              collection(firestore, 'connectionRequests'),
              where('userId', '==', auth.currentUser.uid)
            ),
            (snapshot) => {
              setSentConnectionRequests(
                snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
              );
            }
          );
          return unsubscribe;
        }
      };

      const unsubscribe = unsubscribeSentRequests();

      return () => {
        unsubscribePosts();
        unsubscribeAuthors();
        unsubscribe && unsubscribe();
      };
    };

    fetchPostsAndAuthors();
  }, [searchParams]);

  const sendConnectionRequest = async (authorId) => {
    try {
      await addDoc(collection(firestore, 'connectionRequests'), {
        userId: auth.currentUser.uid,
        authorId,
        createdAt: new Date(),
      });
      console.log(`Connection request sent to author with ID ${authorId}`);
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setSelectedPost(null);
    setShowPostModal(false);
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>Author: {post.authorUsername}</p>
            <p>Date: {post.createdAt.toDateString()}</p>
            <button onClick={() => handleViewPost(post)}>View Post</button>
          </div>
        ))}
      </div>
      <h2>Authors</h2>
      <div className="author-container">
        {authors.map((author) => (
          <div key={author.id} className="author-card">
            <p>{author.email}</p>
            <button onClick={() => sendConnectionRequest(author.id)}>
              Connect
            </button>
          </div>
        ))}
      </div>
      <h2>Sent Connection Requests</h2>
      <ul>
        {sentConnectionRequests.map((request) => (
          <li key={request.id}>
            <p>
              <strong>Author ID:</strong> {request.authorId}
            </p>
          </li>
        ))}
      </ul>

      {showPostModal && (
        <div className="post-modal">
          <div className="post-modal-content">
            <span className="close-button" onClick={handleClosePostModal}>
              &times;
            </span>
            <h3>{selectedPost.title}</h3>
            <p>Author: {selectedPost.authorUsername}</p>
            <p>Date: {selectedPost.createdAt.toDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: selectedPost.content }}></div>
            {selectedPost.imageURL && (
              <img src={selectedPost.imageURL} alt="Post" />
            )}
            {selectedPost.fileURL && (
              <a
                href={selectedPost.fileURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            )}
            {selectedPost.videoURL && (
              <video controls>
                <source src={selectedPost.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
