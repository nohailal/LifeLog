import { useState, useEffect, useCallback, useRef } from 'react';
import { calculateStreaks } from '../utils/streaks';

const STORAGE_KEY = 'trackerHistory';
const MAX_HISTORY_DAYS = 30;
const SNAPSHOT_INTERVAL = 86400000; // 24 hours in milliseconds

export default function useTrackerHistory() {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      
      // Validate stored data
      if (!Array.isArray(parsed)) {
        console.warn('Invalid history data found in storage');
        return [];
      }
      
      // Filter out invalid entries and ensure proper date format
      return parsed
        .filter(entry => entry && entry.date && entry.metrics)
        .map(entry => ({
          ...entry,
          date: new Date(entry.date).toISOString(),
          metrics: {
            tasksCompleted: entry.metrics.tasksCompleted || 0,
            exerciseMinutes: entry.metrics.exerciseMinutes || 0,
            meditationMinutes: entry.metrics.meditationMinutes || 0,
            sleepHours: entry.metrics.sleepHours || 0,
            moodScore: entry.metrics.moodScore || 0,
            waterIntake: entry.metrics.waterIntake || 0,
            journalEntry: entry.metrics.journalEntry || ''
          }
        }))
        .slice(-MAX_HISTORY_DAYS);
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  });

  const lastSnapshotRef = useRef(null);
  const [error, setError] = useState(null);

  // Persist history to localStorage
  const persistHistory = useCallback((newHistory) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      setError('Failed to save history to storage');
      console.error('Error saving history:', error);
    }
  }, []);

  // Get the current day's entry or create a new one
  const getCurrentDayEntry = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return history.find(entry => entry.date.startsWith(today)) || {
      date: new Date().toISOString(),
      metrics: {
        tasksCompleted: 0,
        exerciseMinutes: 0,
        meditationMinutes: 0,
        sleepHours: 0,
        moodScore: 0,
        waterIntake: 0,
        journalEntry: ''
      }
    };
  }, [history]);

  // Take daily snapshot
  const saveDailySnapshot = useCallback(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Check if we already have a snapshot for today
    if (lastSnapshotRef.current === today) {
      return;
    }

    const currentEntry = getCurrentDayEntry();
    
    setHistory(prev => {
      const filteredHistory = prev.filter(
        entry => !entry.date.startsWith(today)
      );
      
      const newHistory = [...filteredHistory, currentEntry]
        .slice(-MAX_HISTORY_DAYS);
      
      persistHistory(newHistory);
      lastSnapshotRef.current = today;
      
      return newHistory;
    });
  }, [getCurrentDayEntry, persistHistory]);

  // Save metrics for the current day
  const saveDailyData = useCallback((metrics) => {
    const currentEntry = getCurrentDayEntry();
    
    const updatedEntry = {
      ...currentEntry,
      metrics: {
        ...currentEntry.metrics,
        ...metrics,
        lastUpdated: new Date().toISOString()
      }
    };

    setHistory(prev => {
      const today = new Date().toISOString().split('T')[0];
      const filteredHistory = prev.filter(
        entry => !entry.date.startsWith(today)
      );
      
      const newHistory = [...filteredHistory, updatedEntry]
        .slice(-MAX_HISTORY_DAYS);
      
      persistHistory(newHistory);
      return newHistory;
    });
  }, [getCurrentDayEntry, persistHistory]);

  // Calculate statistics
  const getStats = useCallback(() => {
    const streaks = calculateStreaks(history);
    
    const averages = history.reduce((acc, entry) => {
      Object.entries(entry.metrics).forEach(([key, value]) => {
        if (typeof value === 'number') {
          acc[key] = (acc[key] || 0) + value;
        }
      });
      return acc;
    }, {});

    Object.keys(averages).forEach(key => {
      averages[key] = Number((averages[key] / history.length).toFixed(2));
    });

    return {
      streaks,
      averages,
      totalDays: history.length,
      currentDay: getCurrentDayEntry()
    };
  }, [history, getCurrentDayEntry]);

  // Set up daily snapshot interval
  useEffect(() => {
    // Take initial snapshot if needed
    saveDailySnapshot();

    const interval = setInterval(saveDailySnapshot, SNAPSHOT_INTERVAL);
    
    // Check for missed snapshots at midnight
    const midnightCheck = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        saveDailySnapshot();
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(interval);
      clearInterval(midnightCheck);
    };
  }, [saveDailySnapshot]);

  // Export methods and data
  return {
    history,
    stats: getStats(),
    getCurrentDay: getCurrentDayEntry,
    saveDailyData,
    error,
    clearError: () => setError(null)
  };
}
