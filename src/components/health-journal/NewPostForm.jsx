import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { 
  selectIsExpanded, 
  selectNewPost,
  setExpanded,
  setNewPostCaption,
  setNewPostMood,
  addPost,
} from "@/slices/healthJournalSlice";

const NewPostForm = () => {
  const dispatch = useDispatch();
  const isExpanded = useSelector(selectIsExpanded);
  const newPost = useSelector(selectNewPost);

  // Handle creating a post with animation
  const handleAddPost = () => {
    dispatch(addPost());
    // Remove the "isNew" flag after animation completes
    setTimeout(() => {
      const postId = Date.now(); // This matches how we create IDs in the reducer
      dispatch(markPostAsOld(postId));
    }, 1000);
  };

  return (
    <div className={`bg-white p-4 rounded-xl shadow-md mb-6 transition-all duration-500 transform ${isExpanded ? 'scale-102 ring-2 ring-indigo-200' : ''}`}>
      {!isExpanded ? (
        <button 
          onClick={() => dispatch(setExpanded(true))}
          className="w-full p-4 text-gray-500 text-left rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 flex items-center group"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3 group-hover:bg-indigo-200 transition-all duration-300">
            <FaPlus className="text-indigo-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="group-hover:text-indigo-600 transition-colors duration-300">Share a new journal entry...</span>
        </button>
      ) : (
        <div className="transition-all duration-500 ease-in-out transform origin-top">
          <textarea 
            placeholder="Share your thoughts, feelings, or struggles..." 
            value={newPost.caption} 
            onChange={(e) => dispatch(setNewPostCaption(e.target.value))} 
            className="w-full p-4 mb-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300" 
            rows={3}
            autoFocus
          />
          <div className="flex flex-wrap justify-between items-center mb-3">
            <div className="flex items-center mb-2 sm:mb-0">
              <span className="text-gray-700 mr-2">Mood:</span>
              <select 
                value={newPost.mood} 
                onChange={(e) => dispatch(setNewPostMood(e.target.value))} 
                className="border border-gray-200 p-2 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300"
              >
                <option value="😊">😊 Happy</option>
                <option value="😢">😢 Sad</option>
                <option value="😡">😡 Angry</option>
                <option value="😌">😌 Relaxed</option>
                <option value="😰">😰 Anxious</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => dispatch(setExpanded(false))} 
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddPost} 
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPostForm;