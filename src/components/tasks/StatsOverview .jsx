import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { selectShowStats, setShowStats } from "@/slices/uiSlice";
import { selectTaskStats } from "@/slices/tasksSlice";
import { 
  selectSleepHours, 
  selectSteps, 
  selectWaterCups 
} from "@/slices/wellnessSlice";
import { XIcon, EyeIcon } from "lucide-react";

const StatsOverview = () => {
  const dispatch = useDispatch();
  const showStats = useSelector(selectShowStats);
  const { completedTasksCount, totalTasksCount, completionRate } = useSelector(selectTaskStats);
  const sleepHours = useSelector(selectSleepHours);
  const steps = useSelector(selectSteps);
  const waterCups = useSelector(selectWaterCups);

  if (!showStats) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 w-full max-w-6xl flex justify-center"
      >
        <Button
          variant="outline"
          onClick={() => dispatch(setShowStats(true))}
          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-800"
        >
          <EyeIcon className="h-4 w-4 mr-2" />
          Show Stats
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mb-6"
      >
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl font-bold">Daily Stats</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(setShowStats(false))}
              className="h-8 w-8 rounded-full"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-purple-700">Task Completion</span>
                  <span className="text-2xl">📝</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{completedTasksCount} of {totalTasksCount} tasks</span>
                    <span>{completionRate}%</span>
                  </div>
                  <Progress 
                    value={completionRate} 
                    className="h-2 bg-gray-200" 
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">Sleep</span>
                  <span className="text-2xl">🌙</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{sleepHours} hours</span>
                    <span>{sleepHours >= 7 ? "Good" : sleepHours >= 5 ? "Fair" : "Low"}</span>
                  </div>
                  <Progress
                    value={(sleepHours / 10) * 100}
                    className="h-2 bg-gray-200"
                    indicatorClassName={
                      sleepHours >= 7 
                        ? "bg-green-500" 
                        : sleepHours >= 5 
                          ? "bg-yellow-500" 
                          : "bg-red-500"
                    }
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-700">Steps</span>
                  <span className="text-2xl">🚶</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{steps || 0} steps</span>
                    <span>{steps >= 10000 ? "Great" : steps >= 5000 ? "Good" : "Low"}</span>
                  </div>
                  <Progress
                    value={Math.min((steps / 10000) * 100, 100)}
                    className="h-2 bg-gray-200"
                    indicatorClassName={
                      steps >= 10000 
                        ? "bg-green-500" 
                        : steps >= 5000 
                          ? "bg-yellow-500" 
                          : "bg-red-500"
                    }
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-700">Water</span>
                  <span className="text-2xl">💧</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{waterCups} cups</span>
                    <span>{waterCups >= 8 ? "Great" : waterCups >= 5 ? "Good" : "Low"}</span>
                  </div>
                  <Progress
                    value={(waterCups / 8) * 100}
                    className="h-2 bg-gray-200"
                    indicatorClassName={
                      waterCups >= 8 
                        ? "bg-green-500" 
                        : waterCups >= 5 
                          ? "bg-yellow-500" 
                          : "bg-red-500"
                    }
                  />
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default StatsOverview;