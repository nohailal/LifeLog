import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSaved: false,
  lastSaved: null,
  exportedData: null,
  savedSnapshots: []
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    saveData: (state, action) => {
      const { tasks, wellness } = action.payload;
      const timestamp = new Date().toISOString();
      
      // Create a snapshot of the current data
      const snapshot = {
        id: timestamp,
        timestamp,
        tasks,
        wellness,
        stats: action.payload.stats
      };
      
      // Add to saved snapshots (limit to last 10)
      state.savedSnapshots = [snapshot, ...state.savedSnapshots].slice(0, 10);
      state.lastSaved = timestamp;
      state.isSaved = true;
      state.exportedData = snapshot;
      
      // Save to localStorage
      localStorage.setItem('dailyTracker_savedSnapshots', JSON.stringify(state.savedSnapshots));
    },
    loadSavedSnapshots: (state) => {
      try {
        const saved = localStorage.getItem('dailyTracker_savedSnapshots');
        if (saved) {
          state.savedSnapshots = JSON.parse(saved);
          state.lastSaved = state.savedSnapshots[0]?.timestamp || null;
        }
      } catch (error) {
        console.error('Error loading saved snapshots:', error);
      }
    }
  }
});

export const { saveData, loadSavedSnapshots } = dataSlice.actions;

export const selectIsSaved = (state) => state.data.isSaved;
export const selectLastSaved = (state) => state.data.lastSaved;
export const selectExportedData = (state) => state.data.exportedData;
export const selectSavedSnapshots = (state) => state.data.savedSnapshots;

export default dataSlice.reducer;