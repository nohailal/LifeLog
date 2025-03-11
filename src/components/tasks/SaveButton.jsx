import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { saveData } from "@/slices/dataSlice";
import { selectTasksByDay, selectTaskStats } from "@/slices/tasksSlice";
import { 
  selectMood, 
  selectSleepHours, 
  selectSteps, 
  selectWaterCups 
} from "@/slices/wellnessSlice";
import { SaveIcon, CheckIcon } from "lucide-react";

const SaveButton = () => {
  const dispatch = useDispatch();
  
  // Select data needed for snapshot
  const tasksByDay = useSelector(selectTasksByDay);
  const stats = useSelector(selectTaskStats);
  const mood = useSelector(selectMood);
  const sleepHours = useSelector(selectSleepHours);
  const steps = useSelector(selectSteps);
  const waterCups = useSelector(selectWaterCups);
  
  // Get last saved time
  const lastSaved = useSelector(state => state.data.lastSaved);
  const formattedLastSaved = lastSaved 
    ? new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  const handleSave = () => {
    dispatch(saveData({
      tasks: tasksByDay,
      wellness: { mood, sleepHours, steps, waterCups },
      stats: stats
    }));
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow"
            >
              {lastSaved ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          {lastSaved 
            ? `Last saved at ${formattedLastSaved}` 
            : "Save your current progress"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SaveButton;