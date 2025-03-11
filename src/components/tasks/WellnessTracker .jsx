import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import MoodTracker from "./MoodTracker";
import SleepTracker from "./SleepTracker";
import StepsTracker from "./StepsTracker";
import WaterTracker from "./WaterTracker";

const WellnessTracker = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Wellness Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MoodTracker />
          <SleepTracker />
          <StepsTracker />
          <WaterTracker />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WellnessTracker;