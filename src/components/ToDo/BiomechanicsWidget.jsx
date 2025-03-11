import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Clock, Share2, BarChart2 } from 'lucide-react';

const MetricCard = ({ label, value, icon: Icon, change }) => (
  <div className="flex items-center justify-between p-3 bg-white dark:bg-rose-800/30 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-rose-100 dark:bg-rose-700/30 rounded-lg">
        <Icon className="w-5 h-5 text-rose-600 dark:text-rose-300" />
      </div>
      <div>
        <p className="text-sm text-rose-700 dark:text-rose-200">{label}</p>
        <p className="text-lg font-bold text-rose-800 dark:text-rose-100">{value}</p>
      </div>
    </div>
    {change && (
      <div className={`text-sm font-medium ${
        change >= 0 ? 'text-green-500' : 'text-red-500'
      }`}>
        {change > 0 ? '+' : ''}{change}%
      </div>
    )}
  </div>
);

const GoalProgress = ({ current, target, label }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-rose-700 dark:text-rose-200">{label}</span>
      <span className="text-rose-800 dark:text-rose-100 font-medium">
        {current} / {target}
      </span>
    </div>
    <div className="relative h-2 bg-rose-200 dark:bg-rose-700/30 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-rose-500 dark:bg-rose-400"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min((current / target) * 100, 100)}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

export default function BiomechanicsWidget() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');
  const timeframes = ['today', 'week', 'month'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-rose-50 dark:bg-rose-900 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-300">
            Activity Monitor
          </h2>
        </div>
        
        <div className="flex gap-1 bg-white dark:bg-rose-800/30 rounded-lg p-1">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-rose-500 text-white'
                  : 'text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-700/30'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-4 mb-6">
        <MetricCard
          label="Steps Taken"
          value="8,542"
          icon={TrendingUp}
          change={12}
        />
        <MetricCard
          label="Active Minutes"
          value="47 mins"
          icon={Clock}
          change={-5}
        />
        <MetricCard
          label="Calories Burned"
          value="423 kcal"
          icon={BarChart2}
          change={8}
        />
      </div>

      <div className="space-y-4">
        <GoalProgress
          current={8542}
          target={10000}
          label="Daily Steps Goal"
        />
        <GoalProgress
          current={47}
          target={60}
          label="Active Minutes Goal"
        />
        <GoalProgress
          current={423}
          target={500}
          label="Calories Goal"
        />
      </div>

      <div className="mt-6 pt-4 border-t border-rose-200 dark:border-rose-700">
        <div className="flex items-center justify-between text-sm text-rose-600 dark:text-rose-300">
          <span>Personal Best: 12,458 steps</span>
          <button
            className="flex items-center gap-1 hover:text-rose-500 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
}