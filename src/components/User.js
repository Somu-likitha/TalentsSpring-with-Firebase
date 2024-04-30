// import React, { useState, useEffect } from 'react';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import { useSearchParams } from 'react-router-dom';

// const User = () => {
//   const [posts, setPosts] = useState([]);
//   const [authors, setAuthors] = useState([]);
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const fetchPostsAndAuthors = async () => {
//       const profession = searchParams.get('profession');

//       const unsubscribePosts = onSnapshot(
//         query(
//           collection(firestore, 'posts'),
//           profession ? where('profession', '==', profession) : null
//         ),
//         (snapshot) => {
//           setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//         }
//       );

//       const unsubscribeAuthors = onSnapshot(
//         collection(firestore, 'users'),
//         (snapshot) => {
//           setAuthors(
//             snapshot.docs
//               .filter((doc) => doc.data().role === 'author')
//               .map((doc) => ({ id: doc.id, ...doc.data() }))
//           );
//         }
//       );

//       return () => {
//         unsubscribePosts();
//         unsubscribeAuthors();
//       };
//     };

//     fetchPostsAndAuthors();
//   }, [searchParams]);

//   return (
//     <div>
//       <h2>Blog Posts</h2>
//       {posts.map((post) => (
//         <div key={post.id}>
//           <h3>{post.title}</h3>
//           <p>{post.content}</p>
//           {post.imageURL && <img src={post.imageURL} alt="Post" />}
//           {post.fileURL && (
//             <a href={post.fileURL} target="_blank" rel="noopener noreferrer">
//               View File
//             </a>
//           )}
//           {post.videoURL && (
//             <video controls>
//               <source src={post.videoURL} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//           <p>Author: {post.author}</p>
//         </div>
//       ))}
//       <h2>Authors</h2>
//       {authors.map((author) => (
//         <div key={author.id}>
//           <p>{author.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default User;

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, addDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import firebase from 'firebase/compat/app';
import { useSearchParams } from 'react-router-dom';

const User = () => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPostsAndAuthors = async () => {
      const profession = searchParams.get('profession');

      const unsubscribePosts = onSnapshot(
        query(
          collection(firestore, 'posts'),
          profession ? where('profession', '==', profession) : null
        ),
        (snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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

      return () => {
        unsubscribePosts();
        unsubscribeAuthors();
      };
    };

    fetchPostsAndAuthors();
  }, [searchParams]);

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

export default User;