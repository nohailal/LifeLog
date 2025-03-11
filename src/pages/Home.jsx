import React from "react";
import { useNavigate } from "react-router-dom";
import TrackerWidget from "@/components/Widget/TrackerWidget.jsx";
import HealthJournalWidget from "@/components/Widget/HealthJournalWidget";
import BlogWidget from "@/components/Widget/BlogWidget";

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleNavigateToTracker = () => {
    navigate("/todo-list");
  };
  
  const handleNavigateToJournal = () => {
    navigate("/journal");
  };
  
  const handleNavigateToBlog = () => {
    navigate("/blog");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome Back</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar with Widgets */}
          <div className="space-y-6">
            <TrackerWidget onNavigate={handleNavigateToTracker} />
            <HealthJournalWidget onNavigate={handleNavigateToJournal} />
            <BlogWidget onNavigate={handleNavigateToBlog} />
            
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="font-semibold text-xl mb-4">Dashboard</h2>
            <p className="text-gray-600">Your main dashboard content goes here.</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;