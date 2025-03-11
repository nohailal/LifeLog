import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, 
  FaBookMedical, 
  FaUserCircle, 
  FaChartLine,
  FaMedal 
} from "react-icons/fa";

const JournalSidebar = ({ animateIn }) => {
  const navigate = useNavigate();
  const handleReturnHome = () => navigate("/home");

  return (
    <aside className={`w-full md:w-1/4 p-4 bg-white md:min-h-screen shadow-lg transition-all duration-700 ease-in-out ${animateIn ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
      {/* App Title for Desktop */}
      <div className="hidden md:flex items-center mb-8 px-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg">
          <FaBookMedical className="text-white text-lg" />
        </div>
        <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Wellness Journal</h1>
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
  );
};

export default JournalSidebar;