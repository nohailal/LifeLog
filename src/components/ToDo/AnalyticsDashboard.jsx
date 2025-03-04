import { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // For area fill
);

// Memoized function to prepare chart data
const prepareChartData = (history) => ({
  labels: history.map((entry) => 
    new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  ),
  datasets: [
    {
      label: 'Activity Trend',
      data: history.map((entry) => entry.count),
      borderColor: '#fb7185', // Rose-500
      backgroundColor: 'rgba(251, 113, 133, 0.1)', // Light rose
      borderWidth: 2,
      tension: 0.4,
      fill: true, // Add area fill
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
});

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hide legend for cleaner UI
    },
    tooltip: {
      enabled: true,
      backgroundColor: '#1f2937', // Dark tooltip
      titleColor: '#f9fafb', // Light text
      bodyColor: '#f9fafb',
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        title: (context) => `Date: ${context[0].label}`,
        label: (context) => `Activities: ${context.raw}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide x-axis grid lines
      },
      ticks: {
        color: '#6b7280', // Gray-500
      },
    },
    y: {
      grid: {
        color: '#e5e7eb', // Light gray grid lines
      },
      ticks: {
        color: '#6b7280',
        stepSize: 1, // Ensure whole numbers
      },
      beginAtZero: true,
    },
  },
};

export default function AnalyticsDashboard({ history }) {
  const [isLoading, setIsLoading] = useState(false);

  // Memoize chart data to prevent unnecessary recalculations
  const chartData = useMemo(() => prepareChartData(history), [history]);

  // Simulate loading state (optional for real API calls)
  useEffect(() => {
    if (history.length === 0) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [history]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          Analytics Dashboard
        </h2>
        <button
          onClick={() => window.location.reload()} // Refresh data
          className="p-2 text-rose-500 hover:text-rose-600 transition-colors"
          aria-label="Refresh data"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Chart */}
      <div className="h-[400px] mb-6 relative">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-rose-400">
            Loading data...
          </div>
        ) : history.length > 0 ? (
          <Line
            data={chartData}
            options={chartOptions}
            key={history.length} // Force re-render on data change
          />
        ) : (
          <div className="h-full flex items-center justify-center text-rose-400">
            No data available yet
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-rose-50 dark:bg-rose-900 p-4 rounded-lg">
          <h3 className="text-rose-600 dark:text-rose-300 font-semibold">Total Activities</h3>
          <p className="text-2xl font-bold text-rose-800 dark:text-rose-200">
            {history.reduce((sum, entry) => sum + entry.count, 0)}
          </p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-900 p-4 rounded-lg">
          <h3 className="text-rose-600 dark:text-rose-300 font-semibold">Average Daily</h3>
          <p className="text-2xl font-bold text-rose-800 dark:text-rose-200">
            {history.length > 0
              ? (history.reduce((sum, entry) => sum + entry.count, 0) / history.length).toFixed(1)
              : 0}
          </p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-900 p-4 rounded-lg">
          <h3 className="text-rose-600 dark:text-rose-300 font-semibold">Peak Day</h3>
          <p className="text-2xl font-bold text-rose-800 dark:text-rose-200">
            {history.length > 0
              ? Math.max(...history.map((entry) => entry.count))
              : 0}
          </p>
        </div>
      </div>
    </motion.div>
  );
}