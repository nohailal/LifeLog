import React from "react";
import { useSelector } from "react-redux";

// Import components
import BlogHeader from "./BlogHeader";
import PostCreator from "./PostCreator";
import PostsFeed from "./PostsFeed";

// Import selectors
import { selectAllPosts } from "@/slices/blogSlice";

const BlogContent = () => {
  const allPosts = useSelector(selectAllPosts);

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <BlogHeader />
        
        {/* Post Creator */}
        <PostCreator />
        
        {/* Posts Feed */}
        <PostsFeed posts={allPosts} />
      </div>
    </div>
  );
};

export default BlogContent;