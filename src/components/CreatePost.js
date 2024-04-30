// import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import { auth, firestore } from '../firebase';
// import { uploadFile } from '../firebase.storage';

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [file, setFile] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [profession, setProfession] = useState('');

import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { auth, firestore } from '../firebase';
import { uploadFile } from '../firebase.storage';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [profession, setProfession] = useState('');
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const imageURL = image ? await uploadFile(image) : null;
//     const fileURL = file ? await uploadFile(file) : null;
//     const videoURL = video ? await uploadFile(video) : null;

//     await firestore.collection('posts').add({
//       title,
//       content,
//       author: auth.currentUser.email,
//       imageURL,
//       fileURL,
//       videoURL,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//     });

//     setTitle('');
//     setContent('');
//     setImage(null);
//     setFile(null);
//     setVideo(null);
//   };

//   return (
//     <div>
//       <h2>Create Post</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
//         <textarea placeholder="Content" value={content} onChange={handleContentChange} />
//         <input type="file" accept="image/*" onChange={handleImageChange} />
//         <input type="file" onChange={handleFileChange} />
//         <input type="file" accept="video/*" onChange={handleVideoChange} />
//         <button type="submit">Create Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const imageURL = image ? await uploadFile(image) : null;
//   const fileURL = file ? await uploadFile(file) : null;
//   const videoURL = video ? await uploadFile(video) : null;
//   await firestore.collection('posts').add({
//     title,
//     content,
//     author: auth.currentUser.email,
//     imageURL,
//     fileURL,
//     videoURL,
//     profession, // Add the profession field
//     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//   });
//   setTitle('');
//   setContent('');
//   setImage(null);
//   setFile(null);
//   setVideo(null);
//   setProfession(''); // Reset the profession field
// };

// return (
//   <div>
//     <h2>Create Post</h2>
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
//       <textarea placeholder="Content" value={content} onChange={handleContentChange} />
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       <input type="file" onChange={handleFileChange} />
//       <input type="file" accept="video/*" onChange={handleVideoChange} />
//       <select value={profession} onChange={(e) => setProfession(e.target.value)}>
//         <option value="">Select Profession</option>
//         <option value="household">Household</option>
//         <option value="banking">Banking</option>
//         <option value="government">Government</option>
//         <option value="software">Software</option>
//         <option value="hardware">Hardware</option>
//       </select>
//       <button type="submit">Create Post</button>
//     </form>
//   </div>
// );
// };

// export default CreatePost;
const handleSubmit = async (e) => {
  e.preventDefault();
  const imageURL = image ? await uploadFile(image) : null;
  const fileURL = file ? await uploadFile(file) : null;
  const videoURL = video ? await uploadFile(video) : null;

  await firestore.collection('posts').add({
    title,
    content,
    author: auth.currentUser.email,
    imageURL,
    fileURL,
    videoURL,
    profession, // Add the profession field
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  setTitle('');
  setContent('');
  setImage(null);
  setFile(null);
  setVideo(null);
  setProfession(''); // Reset the profession field
};

return (
  <div>
    <h2>Create Post</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
      <textarea placeholder="Content" value={content} onChange={handleContentChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="file" onChange={handleFileChange} />
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <select value={profession} onChange={(e) => setProfession(e.target.value)}>
        <option value="">Select Profession</option>
        <option value="household">Household</option>
        <option value="banking">Banking</option>
        <option value="government">Government</option>
        <option value="software">Software</option>
        <option value="hardware">Hardware</option>
      </select>
      <button type="submit">Create Post</button>
    </form>
  </div>
);
};

export default CreatePost;