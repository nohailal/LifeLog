import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaBookMedical, FaChevronRight } from "react-icons/fa";
import { selectPosts } from "@/slices/healthJournalSlice";

const HealthJournalWidget = () => {
  const navigate = useNavigate();
  const posts = useSelector(selectPosts);
  
  // Only show the latest post in the widget
  const latestPost = posts.length > 0 ? posts[0] : null;
  
  const handleNavigateToJournal = () => {
    navigate("/journal");
  };
  
  // Mood colors mapping for styling
  const moodColors = {
    "😊": "bg-green-50 text-green-600 border-green-200",
    "😢": "bg-blue-50 text-blue-600 border-blue-200",
    "😡": "bg-red-50 text-red-600 border-red-200",
    "😌": "bg-purple-50 text-purple-600 border-purple-200",
    "😰": "bg-yellow-50 text-yellow-600 border-yellow-200"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-semibold flex items-center">
            <span className="mr-2 w-6 h-6 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
              <FaBookMedical className="text-white text-xs" />
            </span>
            Health Journal
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            {posts.length} entries
          </Badge>
        </CardHeader>
        
        <CardContent className="p-4">
          {latestPost ? (
            <div>
              <div className="flex items-start mb-3">
                <div className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${moodColors[latestPost.mood]}`}>
                  <span className="mr-1">{latestPost.mood}</span>
                </div>
                <span className="text-xs text-gray-500 ml-auto">{latestPost.timestamp}</span>
              </div>
              
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                {latestPost.caption}
              </p>
              
              <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span>{latestPost.likes} likes</span>
                <span>{latestPost.comments.length} comments</span>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-sm text-gray-600 mb-2">No journal entries yet</p>
            </div>
          )}
          
          <button
            onClick={handleNavigateToJournal}
            className="w-full mt-3 flex justify-center items-center py-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
          >
            Open Journal
            <FaChevronRight className="ml-1 h-3 w-3" />
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HealthJournalWidget;