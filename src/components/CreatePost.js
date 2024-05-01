  // import React, { useState } from 'react';
  // import firebase from 'firebase/compat/app';
  // import 'firebase/compat/firestore';
  // import { auth, firestore } from '../firebase';
  // import { uploadFile } from '../firebase.storage';
  // import ReactQuill from 'react-quill';
  // import 'react-quill/dist/quill.snow.css';

  // const CreatePost = () => {
  //   const [title, setTitle] = useState('');
  //   const [content, setContent] = useState('');
  //   const [image, setImage] = useState(null);
  //   const [file, setFile] = useState(null);
  //   const [video, setVideo] = useState(null);
  //   const [profession, setProfession] = useState('');

  //   const handleTitleChange = (e) => {
  //     setTitle(e.target.value);
  //   };

  //   const handleContentChange = (value) => {
  //     setContent(value);
  //   };

  //   const handleImageChange = (e) => {
  //     if (e.target.files[0]) {
  //       setImage(e.target.files[0]);
  //     }
  //   };

  //   const handleFileChange = (e) => {
  //     if (e.target.files[0]) {
  //       setFile(e.target.files[0]);
  //     }
  //   };

  //   const handleVideoChange = (e) => {
  //     if (e.target.files[0]) {
  //       setVideo(e.target.files[0]);
  //     }
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     // Check if title and profession are filled
  //     if (!title.trim() || !profession.trim()) {
  //       alert('Please fill in the title and profession fields.');
  //       return;
  //     }

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
  //       profession,
  //       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     });

  //     setTitle('');
  //     setContent('');
  //     setImage(null);
  //     setFile(null);
  //     setVideo(null);
  //     setProfession('');
  //   };

  //   return (
  //     <div>
  //       <h2>Create Post</h2>
  //       <form onSubmit={handleSubmit}>
  //         <label htmlFor="title">Title:</label>
  //         <input
  //           type="text"
  //           id="title"
  //           placeholder="Title"
  //           value={title}
  //           onChange={handleTitleChange}
  //         />
  //         <br />
  //         <label htmlFor="content">Content:</label>
  //         <ReactQuill
  //           id="content"
  //           value={content}
  //           onChange={handleContentChange}
  //           modules={CreatePost.modules}
  //           formats={CreatePost.formats}
  //         />
  //         <br />
  //         <label htmlFor="image">Image:</label>
  //         <input
  //           type="file"
  //           id="image"
  //           accept="image/*"
  //           onChange={handleImageChange}
  //         />
  //         <br />
  //         <label htmlFor="file">File:</label>
  //         <input type="file" id="file" onChange={handleFileChange} />
  //         <br />
  //         <label htmlFor="video">Video:</label>
  //         <input
  //           type="file"
  //           id="video"
  //           accept="video/*"
  //           onChange={handleVideoChange}
  //         />
  //         <br />
  //         <label htmlFor="profession">Profession:</label>
  //         <select
  //           id="profession"
  //           value={profession}
  //           onChange={(e) => setProfession(e.target.value)}
  //         >
  //           <option value="">Select Profession</option>
  //           <option value="household">Household</option>
  //           <option value="banking">Banking</option>
  //           <option value="government">Government</option>
  //           <option value="software">Software</option>
  //           <option value="hardware">Hardware</option>
  //         </select>
  //         <br />
  //         <button type="submit">Create Post</button>
  //       </form>
  //     </div>
  //   );
  // };

  // CreatePost.modules = {
  //   toolbar: [
  //     [{ header: '1' }, { header: '2' }, { font: [] }],
  //     [{ size: [] }],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  //     ['link', 'image', 'video'],
  //     ['clean'],
  //   ],
  //   clipboard: {
  //     matchVisual: false,
  //   },
  // };

  // CreatePost.formats = [
  //   'header',
  //   'font',
  //   'size',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'blockquote',
  //   'list',
  //   'bullet',
  //   'indent',
  //   'link',
  //   'image',
  //   'video',
  // ];

  // export default CreatePost;

  import React, { useState } from 'react';
  import firebase from 'firebase/compat/app';
  import 'firebase/compat/firestore';
  import { auth, firestore } from '../firebase';
  import { uploadFile } from '../firebase.storage';
  import ReactQuill from 'react-quill';
  import 'react-quill/dist/quill.snow.css';

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

    const handleContentChange = (value) => {
      setContent(value);
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
    
      // Check if title, content, and profession are filled
      if (!title.trim() || !content.trim() || !profession.trim()) {
        alert('Please fill in all fields.');
        return;
      }
    
      const imageURL = image ? await uploadFile(image) : null;
      const fileURL = file ? await uploadFile(file) : null;
      const videoURL = video ? await uploadFile(video) : null;
    
      // Get the HTML content from ReactQuill
      const formattedContent = document.getElementById('content').innerHTML;
    
      // Determine formatting styles based on ReactQuill's delta object or HTML structure
      const formattingStyles = {}; // Implement logic to determine formatting styles
    
      await firestore.collection('posts').add({
        title,
        content: formattedContent,
        formattingStyles,
        author: auth.currentUser.email,
        imageURL,
        fileURL,
        videoURL,
        profession,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    
      // Clear form fields after submission
      setTitle('');
      setContent('');
      setImage(null);
      setFile(null);
      setVideo(null);
      setProfession('');
    };
    

    return (
      <div>
        <h2>Create Post</h2>
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
          <ReactQuill
            id="content"
            value={content}
            onChange={handleContentChange}
            modules={CreatePost.modules}
            formats={CreatePost.formats}
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
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  };

  CreatePost.modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  CreatePost.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'script',
    'align',
    'link',
    'image',
    'video',
  ];

  export default CreatePost;