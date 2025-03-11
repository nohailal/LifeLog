import React, { useState, useMemo } from 'react';
import { Calendar } from 'react-date-range';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Custom day content component with memoization
const DayContent = React.memo(({ date, historyMap }) => {
  const dateString = date.toISOString().split('T')[0];
  const entry = historyMap.get(dateString);

  if (!entry) return null;

  return (
    <div className="w-full h-full relative group">
      {/* Mood background overlay */}
      <motion.span 
        className="absolute inset-0 rounded-full"
        style={{ 
          backgroundColor: `rgba(251, 113, 133, ${entry.moodScore / 10})`,
        }}
        initial={{ opacity: 0.3 }}
        whileHover={{ opacity: 0.5 }}
      />
      
      {/* Activity indicators */}
      <div className="absolute bottom-0 right-0 flex gap-0.5">
        {entry.tasksCompleted > 0 && (
          <motion.div 
            className="w-2 h-2 bg-green-400 rounded-full"
            data-tooltip-id="task-tooltip"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        )}
        {entry.sleepHours >= 7 && (
          <motion.div 
            className="w-2 h-2 bg-blue-400 rounded-full"
            data-tooltip-id="sleep-tooltip"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        )}
      </div>
    </div>
  );
});

// Custom hook for stats calculation
const useCalendarStats = (history, date) => {
  return useMemo(() => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    
    const monthEntries = history.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && 
            entryDate.getFullYear() === currentYear;
    });

    return {
      totalDays: monthEntries.length,
      averageMood: monthEntries.length > 0 
        ? (monthEntries.reduce((sum, entry) => sum + (entry.moodScore || 0), 0) / monthEntries.length).toFixed(1)
        : 'N/A',
      productiveDays: monthEntries.filter(entry => (entry.tasksCompleted || 0) > 0).length,
      goodSleepDays: monthEntries.filter(entry => (entry.sleepHours || 0) >= 7).length
    };
  }, [history, date]);
};

export default function HistoryCalendar({ history = [] }) {
  const [date, setDate] = useState(new Date());
  const stats = useCalendarStats(history, date);
  
  // Create a Map for O(1) date lookups
  const historyMap = useMemo(() => {
    const map = new Map();
    history.forEach(entry => {
      map.set(entry.date.split('T')[0], entry);
    });
    return map;
  }, [history]);

  const dayContentRenderer = (date) => (
    <DayContent date={date} historyMap={historyMap} />
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-rose-600" />
          <h2 className="text-2xl font-bold text-rose-600">
            History Calendar
          </h2>
        </div>
        <Info 
          className="w-5 h-5 text-rose-400 cursor-help"
          data-tooltip-id="calendar-info"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Section */}
        <motion.div 
          className="flex-1"
          transition={{ duration: 0.3 }}
        >
          <Calendar
            date={date}
            onChange={setDate}
            dayContentRenderer={dayContentRenderer}
            className="border-rose-300 rounded-lg"
            color="#fb7185"
            rangeColors={['#fb7185']}
            showMonthAndYearPickers={true}
            aria-label="Activity calendar"
          />
        </motion.div>

        {/* Stats Sidebar */}
        <div className="lg:w-72 space-y-6">
          <motion.div 
            className="bg-rose-50 p-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-rose-600 font-semibold mb-4">
              Monthly Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <StatItem label="Tracked Days" value={`${stats.totalDays} days`} />
              <StatItem label="Avg Mood" value={stats.averageMood} />
              <StatItem label="Productive Days" value={`${stats.productiveDays} days`} />
              <StatItem label="Good Sleep Days" value={`${stats.goodSleepDays} days`} />
            </div>
          </motion.div>

          <motion.div 
            className="p-4 bg-gray-50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h4 className="text-gray-600 text-sm font-medium mb-3">
              Legend
            </h4>
            <div className="space-y-3">
              <LegendItem 
                color="bg-rose-100" 
                label="Mood Intensity" 
                tooltip="Darker color indicates better mood"
              />
              <LegendItem 
                color="bg-green-400" 
                label="Completed Tasks" 
                tooltip="Days with completed tasks"
              />
              <LegendItem 
                color="bg-blue-400" 
                label="Good Sleep" 
                tooltip="7+ hours of sleep"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tooltips */}
      <Tooltip id="task-tooltip" content="Completed tasks" />
      <Tooltip id="sleep-tooltip" content="Good sleep (7+ hours)" />
      <Tooltip id="calendar-info" content="Hover over days to see detailed activity" />
    </motion.div>
  );
}

// Sub-components
const StatItem = ({ label, value }) => (
  <div>
    <p className="text-rose-600/70 text-sm">{label}</p>
    <p className="text-lg font-semibold text-rose-700">
      {value}
    </p>
  </div>
);

const LegendItem = ({ color, label, tooltip }) => (
  <div className="flex items-center gap-2 group">
    <div 
      className={`w-4 h-4 rounded ${color}`}
      data-tooltip-id={`legend-${label}`}
    />
    <span className="text-sm text-gray-600">{label}</span>
    <Tooltip id={`legend-${label}`} content={tooltip} />
  </div>
);