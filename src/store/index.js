import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/slices/tasksSlice';
import wellnessReducer from '@/slices/wellnessSlice';
import uiReducer from '@/slices/uiSlice';
import dataReducer from '@/slices/dataSlice';
import healthJournalReducer from '@/slices/healthJournalSlice';
import blogReducer from '@/slices/blogSlice';



export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    wellness: wellnessReducer,
    ui: uiReducer,
    data: dataReducer,
    healthJournal: healthJournalReducer,
    blog: blogReducer,
  },
});