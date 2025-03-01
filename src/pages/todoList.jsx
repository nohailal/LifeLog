import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoListApp() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [tasks, setTasks] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  const [newTask, setNewTask] = useState("");
  const [activeDay, setActiveDay] = useState("Monday");
  const [mood, setMood] = useState("");
  const [sleepHours, setSleepHours] = useState(0);
  const [steps, setSteps] = useState("");
  const [waterCups, setWaterCups] = useState(0);
  const [activities, setActivities] = useState([]);
  const [showStats, setShowStats] = useState(true);

  // Get current date
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  // Load data from local storage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('dailyTrackerTasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    
    const savedMood = localStorage.getItem('dailyTrackerMood');
    if (savedMood) setMood(savedMood);
    
    const savedSleep = localStorage.getItem('dailyTrackerSleep');
    if (savedSleep) setSleepHours(Number(savedSleep));
    
    const savedSteps = localStorage.getItem('dailyTrackerSteps');
    if (savedSteps) setSteps(savedSteps);
    
    const savedWater = localStorage.getItem('dailyTrackerWater');
    if (savedWater) setWaterCups(Number(savedWater));
    
    // Set active day to today
    const dayName = new Date().toLocaleString('en-US', {weekday: 'long'});
    if (days.includes(dayName)) {
      setActiveDay(dayName);
    }
  }, []);

  // Save data to local storage when it changes
  useEffect(() => {
    localStorage.setItem('dailyTrackerTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('dailyTrackerMood', mood);
  }, [mood]);

  useEffect(() => {
    localStorage.setItem('dailyTrackerSleep', sleepHours.toString());
  }, [sleepHours]);

  useEffect(() => {
    localStorage.setItem('dailyTrackerSteps', steps);
  }, [steps]);

  useEffect(() => {
    localStorage.setItem('dailyTrackerWater', waterCups.toString());
  }, [waterCups]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks({ 
        ...tasks, 
        [activeDay]: [
          ...tasks[activeDay], 
          { 
            id: Date.now().toString(),
            text: newTask, 
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      });
      setNewTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = (day, id) => {
    const updatedTasks = { ...tasks };
    const taskIndex = updatedTasks[day].findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
      updatedTasks[day][taskIndex].completed = !updatedTasks[day][taskIndex].completed;
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (day, id) => {
    const updatedTasks = { ...tasks };
    updatedTasks[day] = updatedTasks[day].filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const getMoodEmoji = () => {
    switch(mood) {
      case "Happy": return "😊";
      case "Sad": return "😢";
      case "Sleepy": return "😴";
      case "Neutral": return "😐";
      default: return "❓";
    }
  };

  // Calculate stats
  const completedTasksCount = Object.values(tasks).flat().filter(task => task.completed).length;
  const totalTasksCount = Object.values(tasks).flat().length;
  const completionRate = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 flex flex-col items-center font-sans"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
        className="w-full max-w-6xl mb-6 flex flex-col md:flex-row justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-indigo-800 tracking-tight">
            Daily Tracker
          </h1>
          <p className="text-indigo-600 font-medium">{formattedDate}</p>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-xl shadow-md flex items-center gap-2"
        >
          <span className="text-xl">{getMoodEmoji()}</span>
          <span className="font-medium text-gray-700">
            {mood ? `Feeling ${mood}` : "How are you feeling today?"}
          </span>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showStats && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl mb-6"
          >
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Daily Stats</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowStats(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l3.293-3.293-3.293-3.293a1 1 0 011.414-1.414L10 6.586l3.293-3.293a1 1 0 011.414 1.414L11.414 8l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-purple-700">Task Completion</span>
                    <span className="text-2xl">📝</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{completedTasksCount} of {totalTasksCount} tasks</span>
                      <span>{completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionRate}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">Sleep</span>
                    <span className="text-2xl">🌙</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{sleepHours} hours</span>
                      <span>{sleepHours >= 7 ? "Good" : sleepHours >= 5 ? "Fair" : "Low"}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${sleepHours >= 7 ? "bg-green-500" : sleepHours >= 5 ? "bg-yellow-500" : "bg-red-500"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(sleepHours / 10) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-700">Steps</span>
                    <span className="text-2xl">🚶</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{steps || 0} steps</span>
                      <span>{steps >= 10000 ? "Great" : steps >= 5000 ? "Good" : "Low"}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${steps >= 10000 ? "bg-green-500" : steps >= 5000 ? "bg-yellow-500" : "bg-red-500"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((steps / 10000) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-700">Water</span>
                    <span className="text-2xl">💧</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{waterCups} cups</span>
                      <span>{waterCups >= 8 ? "Great" : waterCups >= 5 ? "Good" : "Low"}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${waterCups >= 8 ? "bg-green-500" : waterCups >= 5 ? "bg-yellow-500" : "bg-red-500"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(waterCups / 8) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showStats && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowStats(true)}
          className="mb-6 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full shadow-md flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
          Show Stats
        </motion.button>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Health Tracker Section */}
        <motion.div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Wellness Tracker</h2>
          
          {/* Mood Selector */}
          <motion.div className="mb-6">
            <label className="block font-medium mb-2 text-gray-700">How are you feeling today?</label>
            <div className="grid grid-cols-4 gap-2">
              {["Happy", "Sad", "Sleepy", "Neutral"].map((moodOption) => (
                <motion.button
                  key={moodOption}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg flex flex-col items-center ${mood === moodOption ? 'bg-indigo-100 border-2 border-indigo-400' : 'bg-gray-50 border border-gray-200'}`}
                  onClick={() => setMood(moodOption)}
                >
                  <span className="text-2xl mb-1">
                    {moodOption === "Happy" ? "😊" : 
                     moodOption === "Sad" ? "😢" : 
                     moodOption === "Sleepy" ? "😴" : "😐"}
                  </span>
                  <span className="text-sm font-medium">{moodOption}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Sleep Hours */}
          <motion.div className="mb-6">
            <label className="block font-medium mb-2 text-gray-700">Hours of Sleep</label>
            <div className="flex flex-wrap gap-2">
              {[...Array(10)].map((_, i) => (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={i}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${sleepHours > i ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-400'}`}
                  onClick={() => setSleepHours(i + 1)}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Steps Taken */}
          <motion.div className="mb-6">
            <label className="block font-medium mb-2 text-gray-700">Steps Taken</label>
            <div className="relative">
              <input
                type="number"
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="How many steps today?"
              />
              <div className="absolute right-3 top-3 text-gray-400">👣</div>
            </div>
          </motion.div>

          {/* Water Intake */}
          <motion.div>
            <label className="block font-medium mb-2 text-gray-700">Water Intake</label>
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, i) => (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={i}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${waterCups > i ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}
                  onClick={() => setWaterCups(i + 1)}
                >
                  💧
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Task Tracker Section */}
        <motion.div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Task Tracker</h2>
          
          {/* Day Selector */}
          <div className="flex overflow-x-auto pb-2 mb-4 -mx-1">
            {days.map((day) => (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 mx-1 rounded-lg whitespace-nowrap ${activeDay === day ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveDay(day)}
              >
                {day}
              </motion.button>
            ))}
          </div>
          
          {/* New Task Input */}
          <div className="flex mb-4">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="Add a new task..."
              className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 text-white px-4 py-3 rounded-r-lg hover:bg-indigo-600 transition flex-shrink-0"
              onClick={addTask}
            >
              Add
            </motion.button>
          </div>
          
          {/* Task List */}
          <div className="flex-grow overflow-auto">
            <AnimatePresence>
              {tasks[activeDay].length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 text-gray-500"
                >
                  <div className="text-4xl mb-2">📝</div>
                  <p>No tasks for {activeDay}. Add one to get started!</p>
                </motion.div>
              ) : (
                <ul className="space-y-2">
                  {tasks[activeDay].map((task) => (
                    <motion.li 
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex justify-between p-3 rounded-lg ${task.completed ? "bg-green-50 border border-green-100" : "bg-gray-50 border border-gray-100"}`}
                    >
                      <div className="flex items-center flex-1">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => toggleTask(activeDay, task.id)}
                          className={`mr-3 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${task.completed ? "border-green-500 bg-green-100" : "border-gray-400"}`}
                        >
                          {task.completed && (
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          )}
                        </motion.button>
                        <span className={`${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                          {task.text}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTask(activeDay, task.id)}
                        className="text-gray-400 hover:text-red-500 transition ml-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}