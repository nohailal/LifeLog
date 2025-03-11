import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

// Import components
import JournalHeader from "@/components/health-journal/JournalHeader";
import JournalSidebar from "@/components/health-journal/JournalSidebar";
import JournalFeed from "@/components/health-journal/JournalFeed";

import { 
  selectAnimateIn, 
  setAnimateIn 
} from "@/slices/healthJournalSlice";

const styles = `
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
`;

export default function HealthJournal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const animateIn = useSelector(selectAnimateIn);

  // Trigger animation on component mount
  useEffect(() => {
    dispatch(setAnimateIn(true));
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 min-h-screen transition-all duration-700">
      {/* Header - Only for mobile */}
      <JournalHeader animateIn={animateIn} />

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <JournalSidebar animateIn={animateIn} />
        
        {/* Main content */}
        <JournalFeed animateIn={animateIn} />
      </div>

      <style jsx>{styles}</style>
    </div>
  );
}