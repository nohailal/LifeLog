import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { selectSleepHours, setSleepHours } from "@/slices/wellnessSlice";

const SleepTracker = () => {
  const dispatch = useDispatch();
  const sleepHours = useSelector(selectSleepHours);

  return (
    <div>
      <Label className="block font-medium mb-2 text-gray-700">
        Hours of Sleep
      </Label>
      <div className="flex flex-wrap gap-2">
        {[...Array(10)].map((_, i) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={i}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
              sleepHours > i
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
            onClick={() => dispatch(setSleepHours(i + 1))}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SleepTracker;