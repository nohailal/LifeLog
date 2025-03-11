export const prepareChartData = (history) => {
    if (!Array.isArray(history)) {
      throw new Error("History must be an array");
    }
  
    // Process history data for Chart.js
    const labels = history.map((entry) => {
      if (!entry.date) {
        throw new Error("Each history entry must have a date");
      }
      return new Date(entry.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    });
  
    // Calculate moving averages
    const calculateMovingAverage = (data, window = 7) => {
      return data.map((_, index, array) => {
        const start = Math.max(0, index - window + 1);
        const values = array.slice(start, index + 1).filter((v) => v !== undefined);
        if (values.length === 0) return 0;
        const sum = values.reduce((acc, val) => acc + val, 0);
        return Number((sum / values.length).toFixed(2));
      });
    };
  
    const moodScores = history.map((entry) => entry.moodScore ?? 0);
    const sleepHours = history.map((entry) => entry.sleepHours ?? 0);
    const tasksCompleted = history.map((entry) => entry.tasksCompleted ?? 0);
  
    return {
      labels,
      datasets: [
        {
          label: "Mood Score",
          data: moodScores,
          borderColor: "#fb7185", // Rose-500
          backgroundColor: "#ffe4e6", // Rose-100
          tension: 0.4,
          yAxisID: "moodAxis",
        },
        {
          label: "Mood Score (7-day avg)",
          data: calculateMovingAverage(moodScores),
          borderColor: "#fb7185", // Rose-500
          borderDash: [5, 5],
          backgroundColor: "transparent",
          tension: 0.4,
          yAxisID: "moodAxis",
        },
        {
          label: "Sleep Hours",
          data: sleepHours,
          borderColor: "#fda4af", // Rose-300
          backgroundColor: "#fff1f2", // Rose-50
          tension: 0.4,
          yAxisID: "sleepAxis",
        },
        {
          label: "Tasks Completed",
          data: tasksCompleted,
          borderColor: "#be123c", // Rose-700
          backgroundColor: "#ffd7dc", // Rose-200
          tension: 0.4,
          yAxisID: "tasksAxis",
        },
      ],
    };
  };
  
  export const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Daily Progress Overview",
        padding: {
          top: 10,
          bottom: 30,
        },
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toFixed(1);
              if (context.dataset.label.includes("Sleep")) {
                label += " hrs";
              } else if (context.dataset.label.includes("Tasks")) {
                label += " tasks";
              }
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      moodAxis: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Mood Score (1-10)",
        },
        min: 0,
        max: 10,
        grid: {
          borderDash: [2, 4],
        },
      },
      sleepAxis: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Sleep Hours",
        },
        min: 0,
        max: 12,
        grid: {
          display: false,
        },
      },
      tasksAxis: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Tasks Completed",
        },
        min: 0,
        grid: {
          display: false,
        },
      },
    },
  };
  
  // Helper function to get statistics
  export const getDataStats = (history) => {
    const calculateStats = (data) => {
      const values = data.filter((val) => val !== null && val !== undefined);
      if (values.length === 0) {
        return { average: 0, max: 0, min: 0, total: 0 };
      }
      return {
        average: Number((values.reduce((acc, val) => acc + val, 0) / values.length).toFixed(2)),
        max: Math.max(...values),
        min: Math.min(...values),
        total: values.reduce((acc, val) => acc + val, 0),
      };
    };
  
    return {
      mood: calculateStats(history.map((entry) => entry.moodScore ?? 0)),
      sleep: calculateStats(history.map((entry) => entry.sleepHours ?? 0)),
      tasks: calculateStats(history.map((entry) => entry.tasksCompleted ?? 0)),
    };
  };
  