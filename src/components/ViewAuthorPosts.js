import React from 'react';

const ViewAuthorPosts = ({ posts }) => {
  return (
    <div>
      <h2>Author Posts</h2>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
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
          </div>
        ))
      ) : (
        <p>No author posts found.</p>
      )}
    </div>
  );
};

export default ViewAuthorPosts;