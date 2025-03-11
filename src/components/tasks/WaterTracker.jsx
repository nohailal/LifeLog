import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { selectWaterCups, setWaterCups } from "@/slices/wellnessSlice";

const WaterTracker = () => {
  const dispatch = useDispatch();
  const waterCups = useSelector(selectWaterCups);

  return (
    <div>
      <Label className="block font-medium mb-2 text-gray-700">
        Water Intake
      </Label>
      <div className="flex flex-wrap gap-2">
        {[...Array(8)].map((_, i) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={i}
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
              waterCups > i
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
            onClick={() => dispatch(setWaterCups(i + 1))}
          >
            💧
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default WaterTracker;