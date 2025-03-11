import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiEye, FiLock, FiGlobe, FiUsers } from 'react-icons/fi';

function PrivacySettings() {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    twoFactorAuth: false,
    emailVisibility: 'friends',
    activityStatus: true,
    searchable: true,
    dataCollection: false,
    blockList: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-2xl mx-auto p-6"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
        <FiShield className="w-8 h-8 text-rose-600" />
        <h1 className="text-3xl font-bold text-gray-800">Privacy Settings</h1>
      </motion.div>

      <div className="space-y-6">
        {/* Profile Visibility Section */}
        <motion.section variants={itemVariants} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FiGlobe className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-semibold text-gray-800">Profile Visibility</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <select
                name="profileVisibility"
                value={settings.profileVisibility}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </motion.section>



        {/* Communication Privacy */}
        <motion.section variants={itemVariants} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FiEye className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-semibold text-gray-800">Communication Privacy</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Activity Status</h3>
                <p className="text-sm text-gray-500">Show when you're active</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="activityStatus"
                  checked={settings.activityStatus}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Search Visibility</h3>
                <p className="text-sm text-gray-500">Allow others to find you by email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="searchable"
                  checked={settings.searchable}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        </motion.section>

        {/* Data Collection */}
        <motion.section variants={itemVariants} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <FiUsers className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-semibold text-gray-800">Data Collection</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-700">Usage Data Collection</h3>
                <p className="text-sm text-gray-500">Allow us to collect usage data to improve our services</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="dataCollection"
                  checked={settings.dataCollection}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
              </label>
            </div>
          </div>
        </motion.section>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-rose-600 text-white py-3 rounded-md hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
        >
          Save Changes
        </motion.button>
      </div>
    </motion.div>
  );
}

export default PrivacySettings;