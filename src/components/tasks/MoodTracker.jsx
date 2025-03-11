import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { selectMood, setMood } from "@/slices/wellnessSlice";

const MoodTracker = () => {
  const dispatch = useDispatch();
  const currentMood = useSelector(selectMood);
  
  const moods = [
    { name: "Happy", emoji: "😊" },
    { name: "Sad", emoji: "😢" },
    { name: "Sleepy", emoji: "😴" },
    { name: "Neutral", emoji: "😐" }
  ];

  return (
    <div>
      <Label className="block font-medium mb-2 text-gray-700">
        How are you feeling today?
      </Label>
      <div className="grid grid-cols-4 gap-2">
        {moods.map((mood) => (
          <motion.button
            key={mood.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-lg flex flex-col items-center ${
              currentMood === mood.name
                ? "bg-indigo-100 border-2 border-indigo-400"
                : "bg-gray-50 border border-gray-200"
            }`}
            onClick={() => dispatch(setMood(mood.name))}
          >
            <span className="text-2xl mb-1">{mood.emoji}</span>
            <span className="text-sm font-medium">{mood.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;