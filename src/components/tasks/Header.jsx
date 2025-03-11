import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectMood } from "@/slices/wellnessSlice";

const Header = ({ formattedDate }) => {
  const mood = useSelector(selectMood);

  const getMoodEmoji = () => {
    switch (mood) {
      case "Happy":
        return "😊";
      case "Sad":
        return "😢";
      case "Sleepy":
        return "😴";
      case "Neutral":
        return "😐";
      default:
        return "❓";
    }
  };

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
    >
      <div>
        <h1 className="text-4xl font-bold text-indigo-800 tracking-tight">
          Daily Tracker
        </h1>
        <p className="text-indigo-600 font-medium">{formattedDate}</p>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
      >
        <span className="text-xl">{getMoodEmoji()}</span>
        <span className="font-medium text-gray-700">
          {mood ? `Feeling ${mood}` : "How are you feeling today?"}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default Header;