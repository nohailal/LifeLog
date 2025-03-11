import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TaskList from "./TaskList";
import { 
  selectActiveDay,
  selectActiveDayTasks,
  setActiveDay,
  addTask
} from "@/slices/tasksSlice";

const TaskTracker = () => {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);
  const tasks = useSelector(selectActiveDayTasks);
  const [newTask, setNewTask] = useState("");
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask({ day: activeDay, text: newTask }));
      setNewTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Task Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeDay} onValueChange={(value) => dispatch(setActiveDay(value))}>
            <TabsList className="grid grid-cols-7">
              {days.map((day) => (
                <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">
                  {day.slice(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {days.map((day) => (
              <TabsContent key={day} value={day} className="pt-4">
                <div className="flex space-x-2 mb-4">
                  <Input
                    placeholder="Add a new task..."
                    value={day === activeDay ? newTask : ""}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-grow"
                  />
                  <Button onClick={handleAddTask}>Add</Button>
                </div>
                
                <TaskList day={day} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskTracker;