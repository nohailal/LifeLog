export const calculateStreaks = (history) => {
    if (!Array.isArray(history)) {
      throw new Error('History must be an array');
    }
  
    // Initialize streak trackers
    const streaks = {
      current: {
        productivity: 0,
        exercise: 0,
        mindfulness: 0,
        sleep: 0,
        total: 0 
      },
      longest: {
        productivity: 0,
        exercise: 0,
        mindfulness: 0,
        sleep: 0,
        total: 0
      },
      lastActive: {
        productivity: null,
        exercise: null,
        mindfulness: null,
        sleep: null,
        total: null
      }
    };
  
    // Sort history by date in descending order
    const sortedHistory = [...history].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
  
    // Helper function to check if dates are consecutive
    const isConsecutiveDay = (date1, date2) => {
      if (!date1 || !date2) return false;
      const dayDiff = Math.abs(
        (new Date(date1).setHours(0, 0, 0, 0) - 
         new Date(date2).setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
      );
      return dayDiff === 1;
    };
  
    // Process each day's data
    sortedHistory.forEach((entry, index) => {
      const currentDate = new Date(entry.date);
      const metrics = entry.metrics || {};
  
      // Define goal achievements
      const achievements = {
        productivity: (metrics.tasksCompleted || 0) >= 3,
        exercise: (metrics.exerciseMinutes || 0) >= 30,
        mindfulness: (metrics.meditationMinutes || 0) >= 10,
        sleep: (metrics.sleepHours || 0) >= 7
      };
  
      // Check if all goals were met
      const allGoalsMet = Object.values(achievements).every(Boolean);
  
      // Update streaks for each category
      Object.entries(achievements).forEach(([category, achieved]) => {
        const prevDate = streaks.lastActive[category];
        
        if (achieved) {
          if (isConsecutiveDay(currentDate, prevDate)) {
            streaks.current[category]++;
          } else {
            streaks.current[category] = 1;
          }
          
          streaks.longest[category] = Math.max(
            streaks.longest[category], 
            streaks.current[category]
          );
          streaks.lastActive[category] = currentDate;
        } else {
          streaks.current[category] = 0;
        }
      });
  
      // Update total streaks (all goals met)
      if (allGoalsMet) {
        if (isConsecutiveDay(currentDate, streaks.lastActive.total)) {
          streaks.current.total++;
        } else {
          streaks.current.total = 1;
        }
        
        streaks.longest.total = Math.max(
          streaks.longest.total, 
          streaks.current.total
        );
        streaks.lastActive.total = currentDate;
      } else {
        streaks.current.total = 0;
      }
    });
  
    // Add additional statistics
    const stats = {
      streaks,
      achievements: {
        productivity: sortedHistory.filter(entry => 
          (entry.metrics?.tasksCompleted || 0) >= 3
        ).length,
        exercise: sortedHistory.filter(entry => 
          (entry.metrics?.exerciseMinutes || 0) >= 30
        ).length,
        mindfulness: sortedHistory.filter(entry => 
          (entry.metrics?.meditationMinutes || 0) >= 10
        ).length,
        sleep: sortedHistory.filter(entry => 
          (entry.metrics?.sleepHours || 0) >= 7
        ).length
      },
      perfectDays: sortedHistory.filter(entry => {
        const m = entry.metrics || {};
        return (m.tasksCompleted || 0) >= 3 &&
               (m.exerciseMinutes || 0) >= 30 &&
               (m.meditationMinutes || 0) >= 10 &&
               (m.sleepHours || 0) >= 7;
      }).length,
      lastPerfectDay: null
    };
  
    // Find last perfect day
    const lastPerfectDay = sortedHistory.find(entry => {
      const m = entry.metrics || {};
      return (m.tasksCompleted || 0) >= 3 &&
             (m.exerciseMinutes || 0) >= 30 &&
             (m.meditationMinutes || 0) >= 10 &&
             (m.sleepHours || 0) >= 7;
    });
  
    if (lastPerfectDay) {
      stats.lastPerfectDay = new Date(lastPerfectDay.date);
    }
  
    return stats;
  };
