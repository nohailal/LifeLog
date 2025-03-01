import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaComment, FaShare, FaPlus, FaUserCircle, FaChartLine, FaBookMedical, FaMedal, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function HealthJournal() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      caption: "Morning meditation helps clear my mind and set the tone for the day. ☀️ #Mindfulness #HealthJournal",
      likes: 120,
      comments: [
        { username: "fit_life", text: "Absolutely agree!" },
        { username: "yoga_lover", text: "Meditation changed my life." }
      ],
      mood: "😊",
      timestamp: "Today at 8:45 AM"
    }
  ]);
  
  const [likedPosts, setLikedPosts] = useState({});
  const [newPost, setNewPost] = useState({ caption: "", mood: "😊" });
  const [showComments, setShowComments] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("journal");
  const [animateIn, setAnimateIn] = useState(false);
  const [highlightedPost, setHighlightedPost] = useState(null);

  // Animation trigger on component mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Animation when highlighting a post
  const highlightPostTemporarily = (postId) => {
    setHighlightedPost(postId);
    setTimeout(() => setHighlightedPost(null), 1000);
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    if (!likedPosts[postId]) {
      highlightPostTemporarily(postId);
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const addPost = () => {
    if (newPost.caption) {
      const now = new Date();
      const timeString = `Today at ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
      
      const newPostObj = { 
        id: posts.length + 1, 
        ...newPost, 
        likes: 0, 
        comments: [],
        timestamp: timeString,
        isNew: true
      };
      
      setPosts([newPostObj, ...posts]);
      setNewPost({ caption: "", mood: "😊" });
      setIsExpanded(false);
      
      // Remove the "isNew" flag after animation completes
      setTimeout(() => {
        setPosts(currentPosts => 
          currentPosts.map(post => 
            post.id === newPostObj.id ? {...post, isNew: false} : post
          )
        );
      }, 1000);
    }
  };

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

  const navigate = useNavigate();
  const handleReturnHome = () => navigate("/home");
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 min-h-screen transition-all duration-700">
      {/* Header - Now only for mobile */}
      <header className={`md:hidden bg-white shadow-md p-4 flex justify-between items-center transition-all duration-700 ease-in-out ${animateIn ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
            <FaBookMedical className="text-white text-lg" />
          </div>
          <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Wellness Journal</h1>
        </div>
        <div className="flex items-center">
          <button 
            onClick={handleReturnHome}
            className="p-2 mr-2 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
            aria-label="Return to Home"
          >
            <FaHome className="h-6 w-6" />
          </button>
          <button className="p-2 text-gray-600 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar with navigation */}
        <aside className={`w-full md:w-1/4 p-4 bg-white md:min-h-screen shadow-lg transition-all duration-700 ease-in-out ${animateIn ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          {/* App Title for Desktop */}
          <div className="hidden md:flex items-center mb-8 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
              <FaBookMedical className="text-white text-lg" />
            </div>
            <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Wellness Journal</h1>
          </div>
          
          {/* Return Home Button for Desktop */}
          <div className="hidden md:block mb-6">
            <button 
              onClick={handleReturnHome}
              className="w-full flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-lg"
            >
              <FaHome className="mr-3" />
              <span>Return Home</span>
            </button>
          </div>
         
          {/* User Dashboard */}
          <div className="mb-6">
            <div className="flex items-center mb-6 px-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-md transform transition-transform duration-500 hover:scale-110">
                <FaUserCircle className="text-white text-xl" />
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-bold text-gray-800">Your Wellness Dashboard</h2>
                <p className="text-sm text-gray-500">Track your journey to better health</p>
              </div>
            </div>
            
            <div className="p-4 mb-6 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 transition-all duration-500 hover:shadow-md">
              <h3 className="text-indigo-700 font-medium mb-2 flex items-center">
                <FaChartLine className="mr-2" /> 
                <span>Progress Summary</span>
              </h3>
              <div className="w-full bg-white rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full w-2/3 transition-all duration-1000 ease-out"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>4 of 7 daily entries</p>
                <p className="font-medium text-indigo-600">57%</p>
              </div>
            </div>
          </div>
          
          {/* Tips Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4 text-indigo-700 border-b border-indigo-100 pb-2 flex items-center px-2">
              <FaMedal className="mr-2" />
              <span>Wellness Tips</span>
            </h2>
            <ul className="space-y-3 text-gray-700">
              {[
                "Practice mindfulness daily",
                "Get at least 7-8 hours of sleep",
                "Stay hydrated and eat healthy",
                "Exercise regularly to boost mood",
                "Talk to someone if you feel overwhelmed"
              ].map((tip, index) => (
                <li 
                  key={index} 
                  className="flex items-center p-2 rounded-lg transition-all duration-500 hover:bg-indigo-50 hover:translate-x-1"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 mr-3"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly Streak */}
          <div className="p-4 rounded-lg border bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100 transition-all duration-500 hover:shadow-md">
            <h3 className="text-pink-600 font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Weekly Streak
            </h3>
            <div className="flex justify-between mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-all duration-300 ${i < 4 ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>
                    {day}
                  </div>
                  <div className={`w-1 h-1 rounded-full ${i < 4 ? 'bg-pink-400' : 'bg-gray-200'}`}></div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">4 day streak! Keep it going!</p>
          </div>
        </aside>
        
        {/* Main content */}
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
          <div className={`bg-white p-4 rounded-xl shadow-md mb-6 transition-all duration-500 transform ${isExpanded ? 'scale-102 ring-2 ring-indigo-200' : ''}`}>
            {!isExpanded ? (
              <button 
                onClick={() => setIsExpanded(true)}
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
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })} 
                  className="w-full p-4 mb-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300" 
                  rows={3}
                  autoFocus
                />
                <div className="flex flex-wrap justify-between items-center mb-3">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className="text-gray-700 mr-2">Mood:</span>
                    <select 
                      value={newPost.mood} 
                      onChange={(e) => setNewPost({ ...newPost, mood: e.target.value })} 
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
                      onClick={() => setIsExpanded(false)} 
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={addPost} 
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Posts */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className={`bg-white rounded-xl shadow-md p-5 transform transition-all duration-500 
                  ${post.isNew ? 'animate-slide-in opacity-100 scale-100' : ''} 
                  ${highlightedPost === post.id ? 'ring-2 ring-pink-400 scale-102' : 'hover:shadow-lg hover:-translate-y-1'}`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-sm">
                    <FaUserCircle className="text-white text-xl" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">You</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{post.caption}</p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full mb-4 border transition-all duration-300 ${moodColors[post.mood]}`}>
                  <span className="mr-2">{post.mood}</span>
                  <span className="text-sm font-medium">{moodLabels[post.mood]}</span>
                </div>
                
                <div className="flex items-center justify-between text-gray-500 border-t border-gray-100 pt-3">
                  <button 
                    onClick={() => toggleLike(post.id)} 
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
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center transition-all duration-300 hover:text-indigo-500 group"
                  >
                    <FaComment className="mr-2 group-hover:scale-110 transition-all duration-300" />
                    <span>{post.comments.length}</span>
                  </button>
                  
                  <button className="transition-all duration-300 hover:text-indigo-500 group">
                    <FaShare className="group-hover:scale-110 transition-all duration-300" />
                  </button>
                </div>
                
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
                        className="flex-1 p-2 border border-gray-200 rounded-lg mr-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-300"
                      />
                      <button className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105">
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        .animate-pulse {
          animation: pulse 0.8s ease-in-out;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}