import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { uploadFile } from '../firebase.storage';
import CreatePost from './CreatePost';

const EditPost = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState(state?.title || '');
  const [content, setContent] = useState(state?.content || '');
  const [image, setImage] = useState(state?.imageURL || null);
  const [file, setFile] = useState(state?.fileURL || null);
  const [video, setVideo] = useState(state?.videoURL || null);
  const [profession, setProfession] = useState(state?.profession || '');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if title and profession are filled
    if (!title.trim() || !profession.trim()) {
      alert('Please fill in the title and profession fields.');
      return;
    }

    const imageURL = image ? await uploadFile(image) : null;
    const fileURL = file ? await uploadFile(file) : null;
    const videoURL = video ? await uploadFile(video) : null;

    const postData = {
      title,
      content,
      author: auth.currentUser.email,
      imageURL,
      fileURL,
      videoURL,
      profession,
    };

    await updateDoc(doc(firestore, 'posts', state.id), postData);

    navigate('/author');
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          rows="10"
        />
        <br />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />
        <label htmlFor="file">File:</label>
        <input type="file" id="file" onChange={handleFileChange} />
        <br />
        <label htmlFor="video">Video:</label>
        <input
          type="file"
          id="video"
          accept="video/*"
          onChange={handleVideoChange}
        />
        <br />
        <label htmlFor="profession">Profession:</label>
        <select
          id="profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        >
          <option value="">Select Profession</option>
          <option value="household">Household</option>
          <option value="banking">Banking</option>
          <option value="government">Government</option>
          <option value="software">Software</option>
          <option value="hardware">Hardware</option>
        </select>
        <br />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;