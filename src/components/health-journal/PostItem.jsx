import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaRegHeart, FaComment, FaShare, FaUserCircle } from "react-icons/fa";
import { 
  selectLikedPosts, 
  selectShowComments,
  selectHighlightedPost,
  toggleLike,
  toggleComments,
  highlightPost,
  resetHighlight,
  addComment
} from "@/slices/healthJournalSlice";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const likedPosts = useSelector(selectLikedPosts);
  const showComments = useSelector(selectShowComments);
  const highlightedPost = useSelector(selectHighlightedPost);
  const [newComment, setNewComment] = useState("");

  // Handle like with temporary highlight
  const handleToggleLike = (postId) => {
    dispatch(toggleLike(postId));
    if (!likedPosts[postId]) {
      dispatch(highlightPost(postId));
      setTimeout(() => dispatch(resetHighlight()), 1000);
    }
  };

  // Handle comment submission
  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ postId: post.id, text: newComment }));
      setNewComment("");
    }
  };

  // Handle Enter key press on comment input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  // Mood styles mapping
  const moodColors = {
    "😊": "bg-green-50 text-green-600 border-green-200",
    "😢": "bg-blue-50 text-blue-600 border-blue-200",
    "😡": "bg-red-50 text-red-600 border-red-200",
    "😌": "bg-purple-50 text-purple-600 border-purple-200",
    "😰": "bg-yellow-50 text-yellow-600 border-yellow-200"
  };

  const moodLabels = {
    "😊": "Happy",
    "😢": "Sad",
    "😡": "Angry",
    "😌": "Relaxed",
    "😰": "Anxious"
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-md p-5 transform transition-all duration-500 
        ${post.isNew ? 'animate-slide-in opacity-100 scale-100' : ''} 
        ${highlightedPost === post.id ? 'ring-2 ring-pink-400 scale-102' : 'hover:shadow-lg hover:-translate-y-1'}`}
    >
      {/* Post header with user info */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-sm">
          <FaUserCircle className="text-white text-xl" />
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-800">You</p>
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      
      {/* Post content */}
      <p className="text-gray-700 mb-4 leading-relaxed">{post.caption}</p>
      
      {/* Mood indicator */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full mb-4 border transition-all duration-300 ${moodColors[post.mood]}`}>
        <span className="mr-2">{post.mood}</span>
        <span className="text-sm font-medium">{moodLabels[post.mood]}</span>
      </div>
      
      {/* Interaction buttons */}
      <div className="flex items-center justify-between text-gray-500 border-t border-gray-100 pt-3">
        <button 
          onClick={() => handleToggleLike(post.id)} 
          className="flex items-center transition-all duration-300 hover:text-indigo-500 group"
        >
          {likedPosts[post.id] ? (
            <FaHeart className="text-pink-500 mr-2 transition-all duration-300 animate-pulse" />
          ) : (
            <FaRegHeart className="mr-2 group-hover:scale-110 transition-all duration-300" />
          )}
          <span>{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
        </button>
        
        <button 
          onClick={() => dispatch(toggleComments(post.id))}
          className="flex items-center transition-all duration-300 hover:text-indigo-500 group"
        >
          <FaComment className="mr-2 group-hover:scale-110 transition-all duration-300" />
          <span>{post.comments.length}</span>
        </button>
        
        <button className="transition-all duration-300 hover:text-indigo-500 group">
          <FaShare className="group-hover:scale-110 transition-all duration-300" />
        </button>
      </div>
      
      {/* Comments section */}
      {showComments[post.id] && (
        <div className="mt-4 pt-3 border-t border-gray-100 animate-fade-in">
          {post.comments.map((comment, idx) => (
            <div 
              key={idx} 
              className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100 transition-all duration-300 hover:bg-gray-100 hover:border-gray-200"
            >
              <p className="font-medium text-sm text-indigo-600 mb-1">@{comment.username}</p>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))}
          <div className="mt-3 flex">
            <input 
              type="text" 
              placeholder="Add a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2 border border-gray-200 rounded-lg mr-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300"
            />
            <button 
              onClick={handleAddComment}
              className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;