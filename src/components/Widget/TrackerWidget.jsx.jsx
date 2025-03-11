import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  CheckCircle2, 
  Moon, 
  Activity, 
  Droplets, 
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const TrackerWidget = ({ onNavigate }) => {
  const [latestData, setLatestData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Load the latest snapshot from localStorage
      const savedSnapshots = localStorage.getItem('dailyTracker_savedSnapshots');
      if (savedSnapshots) {
        const snapshots = JSON.parse(savedSnapshots);
        if (snapshots.length > 0) {
          setLatestData(snapshots[0]);
        }
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  if (isLoading) {
    return (
      <Card className="w-full shadow-md">
        <CardContent className="p-6">
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!latestData) {
    return (
      <Card className="w-full shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Your Daily Tracker</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-gray-500 mb-4">No tracked data available yet</p>
            <button
              onClick={onNavigate}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
            >
              Go to Tracker
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const { wellness, stats, timestamp } = latestData;
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full shadow-md overflow-hidden">
        <CardHeader className="pb-2 pt-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">Daily Overview</CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <div className="flex items-center text-indigo-700 mb-1">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Tasks</span>
              </div>
              <div className="mt-1">
                <div className="text-sm font-medium">
                  {stats.completedTasksCount}/{stats.totalTasksCount} completed
                </div>
                <Progress
                  value={stats.completionRate}
                  className="h-1.5 mt-1.5"
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center text-blue-700 mb-1">
                <Moon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Sleep</span>
              </div>
              <div className="text-sm font-medium mt-1">
                {wellness.sleepHours} hours
              </div>
              <Progress
                value={(wellness.sleepHours / 10) * 100}
                className="h-1.5 mt-1.5"
                indicatorClassName={
                  wellness.sleepHours >= 7
                    ? "bg-green-500"
                    : wellness.sleepHours >= 5
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }
              />
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center text-green-700 mb-1">
                <Activity className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Steps</span>
              </div>
              <div className="text-sm font-medium mt-1">
                {wellness.steps || 0} steps
              </div>
              <Progress
                value={Math.min((wellness.steps / 10000) * 100, 100)}
                className="h-1.5 mt-1.5"
                indicatorClassName={
                  wellness.steps >= 10000
                    ? "bg-green-500"
                    : wellness.steps >= 5000
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center text-blue-700 mb-1">
                <Droplets className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Water</span>
              </div>
              <div className="text-sm font-medium mt-1">
                {wellness.waterCups} cups
              </div>
              <Progress
                value={(wellness.waterCups / 8) * 100}
                className="h-1.5 mt-1.5"
                indicatorClassName={
                  wellness.waterCups >= 8
                    ? "bg-green-500"
                    : wellness.waterCups >= 5
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }
              />
            </div>
          </div>
          
          <button
            onClick={onNavigate}
            className="w-full mt-3 flex justify-center items-center py-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
          >
            Go to Daily Tracker
            <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TrackerWidget;