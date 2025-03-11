import React from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toggleTask, deleteTask } from "@/slices/tasksSlice";
import { Trash2 } from "lucide-react";

const TaskItem = ({ task, day }) => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTask({ day, id: task.id }));
  };

  const handleDelete = () => {
    dispatch(deleteTask({ day, id: task.id }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between p-3 rounded-lg ${
        task.completed ? "bg-green-50 border border-green-100" : "bg-gray-50 border border-gray-100"
      }`}
    >
      <div className="flex items-center flex-1">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={handleToggle}
          className="mr-3"
        />
        <label
          htmlFor={`task-${task.id}`}
          className={`${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          } cursor-pointer`}
        >
          {task.text}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default TaskItem;