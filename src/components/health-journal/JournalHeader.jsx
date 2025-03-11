import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBookMedical, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const JournalHeader = ({ animateIn }) => {
  const navigate = useNavigate();
  
  const handleReturnHome = () => navigate("/");

  return (
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
  );
};

export default JournalHeader;