import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { selectPosts } from "@/slices/healthJournalSlice";
import NewPostForm from "./NewPostForm";
import PostItem from "./PostItem";

const JournalFeed = ({ animateIn }) => {
  const navigate = useNavigate();
  const posts = useSelector(selectPosts);

  const handleReturnHome = () => navigate("/home");

  return (
    <div className={`w-full md:w-3/4 p-4 md:p-6 transition-all duration-700 ease-in-out ${animateIn ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 relative">
          <span className="relative">
            Health Journal
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded"></div>
          </span>
        </h1>
        
        {/* Return Home Button for Main Content Area */}
        <button 
          onClick={handleReturnHome}
          className="md:hidden flex items-center px-3 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300"
        >
          <FaHome className="mr-2" />
          <span>Home</span>
        </button>
      </div>
      
      {/* New post form */}
      <NewPostForm />
      
      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default JournalFeed;