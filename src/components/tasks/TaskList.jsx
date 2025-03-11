import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";
import { selectTasksByDay } from "@/slices/tasksSlice";

const TaskList = ({ day }) => {
  const tasksByDay = useSelector(selectTasksByDay);
  const tasks = tasksByDay[day] || [];

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-8 text-gray-500"
      >
        <div className="text-4xl mb-2">📝</div>
        <p>No tasks for {day}. Add one to get started!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} day={day} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;