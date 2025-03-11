import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Header from "@/components/tasks/Header";
import StatsOverview from "@/components/tasks/StatsOverview ";
import WellnessTracker from "@/components/tasks/WellnessTracker ";
import TaskTracker from "@/components/tasks/TaskTracker ";
import SaveButton from "@/components/tasks/SaveButton";
import { loadSavedSnapshots } from "@/slices/dataSlice";

export default function TodoListApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get current date
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  // Load saved snapshots on mount
  useEffect(() => {
    dispatch(loadSavedSnapshots());
  }, [dispatch]);

  const handleNavigateHome = () => {
    navigate("/home");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 flex flex-col items-center font-sans"
    >
      <div className="w-full max-w-6xl flex flex-wrap items-center justify-between gap-4 mb-6">
        
        <div className="flex-grow">
          <Header formattedDate={formattedDate} />
        </div>
        
        <div>
          <SaveButton />
        </div>
      </div>
      
      <StatsOverview />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <WellnessTracker />
        <TaskTracker />
      </motion.div>
    </motion.div>
  );
}