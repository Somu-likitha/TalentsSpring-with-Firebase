// CreatePostPage.js
import React from 'react';
import CreatePost from './CreatePost';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/author');
  };

  return (
    <div>
      <CreatePost onClose={handleClose} />
    </div>
  );
};

export default CreatePostPage;