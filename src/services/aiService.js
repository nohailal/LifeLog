export const generateInsights = (history) => {
    const analysis = {
      moodTrend: history.reduce((acc, day) => acc + (day.moodScore || 0), 0) / history.length,
      productivityScore: history.filter(d => d.tasksCompleted > 3).length / history.length,
      sleepQuality: history.reduce((acc, day) => acc + day.sleepHours, 0) / history.length
    };
  
    return {
      summary: `Based on your ${history.length} days of tracking:`,
      recommendations: [
        analysis.moodTrend < 5 && "Consider more outdoor activities",
        analysis.sleepQuality < 7 && "Try improving your sleep routine",
        analysis.productivityScore < 0.5 && "Focus on prioritizing key tasks"
      ].filter(Boolean)
    };
  };