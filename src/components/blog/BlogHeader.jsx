import React from "react";

const BlogHeader = () => {
  return (
    <div className="text-center text-blue-800 animate-slideIn opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
      <h1 className="text-4xl font-bold tracking-tight">
        My Creative Space
      </h1>
      <p className="mt-2 text-blue-600">Share your thoughts, images, and music with the world.</p>
    </div>
  );
};

export default BlogHeader;