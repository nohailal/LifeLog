import { createSlice } from '@reduxjs/toolkit';

// Helper to load from localStorage with fallback
const loadFromStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const wellnessSlice = createSlice({
  name: 'wellness',
  initialState: {
    mood: loadFromStorage('dailyTrackerMood', ''),
    sleepHours: loadFromStorage('dailyTrackerSleep', 0),
    steps: loadFromStorage('dailyTrackerSteps', ''),
    waterCups: loadFromStorage('dailyTrackerWater', 0),
  },
  reducers: {
    setMood: (state, action) => {
      state.mood = action.payload;
      localStorage.setItem('dailyTrackerMood', JSON.stringify(action.payload));
    },
    setSleepHours: (state, action) => {
      state.sleepHours = action.payload;
      localStorage.setItem('dailyTrackerSleep', JSON.stringify(action.payload));
    },
    setSteps: (state, action) => {
      state.steps = action.payload;
      localStorage.setItem('dailyTrackerSteps', JSON.stringify(action.payload));
    },
    setWaterCups: (state, action) => {
      state.waterCups = action.payload;
      localStorage.setItem('dailyTrackerWater', JSON.stringify(action.payload));
    },
  },
});

// Export actions
export const { setMood, setSleepHours, setSteps, setWaterCups } = wellnessSlice.actions;

// Export selectors
export const selectMood = (state) => state.wellness.mood;
export const selectSleepHours = (state) => state.wellness.sleepHours;
export const selectSteps = (state) => state.wellness.steps;
export const selectWaterCups = (state) => state.wellness.waterCups;

export default wellnessSlice.reducer;