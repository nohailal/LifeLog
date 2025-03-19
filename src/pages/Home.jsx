import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackerWidget from "@/components/Widget/TrackerWidget.jsx";
import HealthJournalWidget from "@/components/Widget/HealthJournalWidget";
import BlogWidget from "@/components/Widget/BlogWidget";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Activity, TrendingUp, Users, Smile, Zap, Gift, Star } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState("weekly");
  
  // Sample data for analytics
  const activityData = [
    { name: "Mon", completed: 5, total: 8 },
    { name: "Tue", completed: 7, total: 9 },
    { name: "Wed", completed: 3, total: 7 },
    { name: "Thu", completed: 8, total: 10 },
    { name: "Fri", completed: 6, total: 8 },
    { name: "Sat", completed: 4, total: 5 },
    { name: "Sun", completed: 2, total: 3 },
  ];
  
  const weeklyTrendData = [
    { name: "Week 1", productivity: 68 },
    { name: "Week 2", productivity: 72 },
    { name: "Week 3", productivity: 65 },
    { name: "Week 4", productivity: 78 },
    { name: "Week 5", productivity: 82 },
  ];
  
  const categoryData = [
    { name: "Work", value: 35, color: "#6366f1" },
    { name: "Health", value: 25, color: "#10b981" },
    { name: "Learning", value: 20, color: "#f59e0b" },
    { name: "Personal", value: 15, color: "#ec4899" },
    { name: "Social", value: 5, color: "#8b5cf6" },
  ];
  
  const completionData = [
    { name: "Mon", rate: 62 },
    { name: "Tue", rate: 78 },
    { name: "Wed", rate: 43 },
    { name: "Thu", rate: 80 },
    { name: "Fri", rate: 75 },
    { name: "Sat", rate: 80 },
    { name: "Sun", rate: 67 },
  ];

  // Calculate summary statistics
  const averageCompletion = Math.round(
    completionData.reduce((sum, item) => sum + item.rate, 0) / completionData.length
  );
  
  const totalTasks = activityData.reduce((sum, day) => sum + day.total, 0);
  const completedTasks = activityData.reduce((sum, day) => sum + day.completed, 0);
  
  // Confetti animation (purely CSS, no external libraries)
  const ConfettiBackground = () => (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-cyan-50"></div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 relative overflow-hidden">
      <ConfettiBackground />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Fun greeting header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-lg border-2 border-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"></div>
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Hey there, Superstar! 🌟
            </h1>
            <p className="text-gray-600">Ready to rock today's tasks?</p>
          </div>
          
          <div className="relative z-10">
            <select 
              value={timePeriod} 
              onChange={(e) => setTimePeriod(e.target.value)}
              className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-100 rounded-xl px-4 py-2 font-medium text-indigo-700 shadow-sm transition-all hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="daily">Daily View</option>
              <option value="weekly">Weekly View</option>
              <option value="monthly">Monthly View</option>
            </select>
          </div>
        </div>
        
        {/* Fun Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-indigo-400 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-400">Completion Rate</p>
                <h3 className="text-3xl font-extrabold">{averageCompletion}%</h3>
                <p className="text-xs font-medium flex items-center text-green-500 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" /> +2% from last week
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-green-400 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-400">Tasks Completed</p>
                <h3 className="text-3xl font-extrabold">{completedTasks}/{totalTasks}</h3>
                <p className="text-xs font-medium flex items-center text-green-500 mt-1">
                  <Zap className="w-3 h-3 mr-1" /> {Math.round((completedTasks/totalTasks)*100)}% completion
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-amber-400 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-400">Productivity Score</p>
                <h3 className="text-3xl font-extrabold">82</h3>
                <p className="text-xs font-medium flex items-center text-green-500 mt-1">
                  <Star className="w-3 h-3 mr-1" /> +5 points this week
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-purple-400 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-400">Current Streak</p>
                <h3 className="text-3xl font-extrabold">7 days</h3>
                <p className="text-xs font-medium flex items-center text-green-500 mt-1">
                  <Gift className="w-3 h-3 mr-1" /> Your best: 14 days
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Smile className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar with Widgets */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl p-4">
                <TrackerWidget onNavigate={() => navigate("/todo-list")} />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-teal-600 p-1 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl p-4">
                <HealthJournalWidget onNavigate={() => navigate("/journal")} />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500 to-pink-600 p-1 rounded-2xl shadow-lg">
              <div className="bg-white rounded-xl p-4">
                <BlogWidget onNavigate={() => navigate("/blog")} />
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                  <span className="inline-block mr-2">📊</span> Weekly Activity
                </h2>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                    <YAxis tick={{ fill: '#6b7280' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '0.5rem',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Legend wrapperStyle={{ paddingTop: 15 }} />
                    <Bar dataKey="completed" name="Completed" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total" name="Total Tasks" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">
                    <span className="inline-block mr-2">🍩</span> Task Categories
                  </h2>
                </div>
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800">
                    <span className="inline-block mr-2">📈</span> Completion Rate
                  </h2>
                </div>
                <div className="p-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={completionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                      <YAxis domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '0.5rem',
                          border: 'none',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ r: 6, fill: '#8b5cf6', strokeWidth: 2, stroke: 'white' }}
                        activeDot={{ r: 8, fill: '#8b5cf6', stroke: 'white', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;