import { createSlice } from '@reduxjs/toolkit';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Initialize state for each day
const initialTasksState = days.reduce((acc, day) => {
  acc[day] = [];
  return acc;
}, {});

// Load tasks from localStorage if available
const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem('dailyTrackerTasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasksState;
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return initialTasksState;
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    activeDay: new Date().toLocaleString('en-US', {weekday: 'long'}),
    byDay: loadTasksFromStorage(),
  },
  reducers: {
    setActiveDay: (state, action) => {
      state.activeDay = action.payload;
    },
    addTask: (state, action) => {
      const { day, text } = action.payload;
      state.byDay[day].push({
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
      });
      // Persist to localStorage
      localStorage.setItem('dailyTrackerTasks', JSON.stringify(state.byDay));
    },
    toggleTask: (state, action) => {
      const { day, id } = action.payload;
      const taskIndex = state.byDay[day].findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.byDay[day][taskIndex].completed = !state.byDay[day][taskIndex].completed;
        // Persist to localStorage
        localStorage.setItem('dailyTrackerTasks', JSON.stringify(state.byDay));
      }
    },
    deleteTask: (state, action) => {
      const { day, id } = action.payload;
      state.byDay[day] = state.byDay[day].filter(task => task.id !== id);
      // Persist to localStorage
      localStorage.setItem('dailyTrackerTasks', JSON.stringify(state.byDay));
    },
  },
});

// Export actions
export const { setActiveDay, addTask, toggleTask, deleteTask } = tasksSlice.actions;

// Export selectors
export const selectActiveDay = (state) => state.tasks.activeDay;
export const selectTasksByDay = (state) => state.tasks.byDay;
export const selectActiveDayTasks = (state) => state.tasks.byDay[state.tasks.activeDay];

// Calculate stats for selectors
export const selectTaskStats = (state) => {
  const allTasks = Object.values(state.tasks.byDay).flat();
  const completedTasks = allTasks.filter(task => task.completed);
  
  return {
    completedTasksCount: completedTasks.length,
    totalTasksCount: allTasks.length,
    completionRate: allTasks.length > 0 
      ? Math.round((completedTasks.length / allTasks.length) * 100) 
      : 0
  };
};

export default tasksSlice.reducer;