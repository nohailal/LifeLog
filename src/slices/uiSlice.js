import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showStats: true,
  },
  reducers: {
    toggleStats: (state) => {
      state.showStats = !state.showStats;
    },
    setShowStats: (state, action) => {
      state.showStats = action.payload;
    },
  },
});

// Export actions
export const { toggleStats, setShowStats } = uiSlice.actions;

// Export selectors
export const selectShowStats = (state) => state.ui.showStats;

export default uiSlice.reducer;