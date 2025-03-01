import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaTwitter, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from '../images/logo.png';

function SignIn() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      return;
    }

    console.log('Form submitted', formData);
  };

  const socialButtonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 50
      }
    }
  };

  return (
    <main className="w-full flex">
      {/* Left Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex bg-gradient-to-r from-[#FAACA8] to-[#DDD6F3]"
      >
        <div className="relative z-10 w-full max-w-md">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={logo} 
            alt="Logo" 
            width={150} 
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-16 space-y-3"
          >
            <h3 className="text-black text-3xl font-bold">Start tracking your daily activities</h3>
            <p className="text-gray-700">"Preserve your journey, one moment at a time."</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center h-screen">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0"
        >
          <div>
            <img src={logo} alt="Logo" width={150} className="lg:hidden" />
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
              <p>
                Already have an account?{' '}
                <a href="/login" className="font-medium text-rose-600 hover:text-rose-500">
                  Log in
                </a>
              </p>
            </div>
          </div>

          {/* Social Login Buttons */}
          <motion.div 
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-x-3"
          >
            {[
              { Icon: FaGoogle, label: "Google" },
              { Icon: FaTwitter, label: "Twitter" },
              { Icon: FaFacebook, label: "Facebook" }
            ].map(({ Icon, label }) => (
              <motion.button
                key={label}
                aria-label={`Sign in with ${label}`}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
              >
                <Icon className="w-5 h-5"/>
              </motion.button>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </p>
          </div>

          {/* Sign Up Form */}
          <motion.form 
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit} 
            className="space-y-5"
          >
            {/* Form Error Message */}
            <AnimatePresence>
              {formError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm"
                >
                  {formError}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name Input */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-rose-600 shadow-sm rounded-lg"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-rose-600 shadow-sm rounded-lg"
              />
            </motion.div>

            {/* Password Input */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 pr-10 text-gray-500 bg-transparent outline-none border focus:border-rose-600 shadow-sm rounded-lg"
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </motion.button>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-rose-600 hover:bg-indigo-500 active:bg-rose-600 rounded-lg duration-150"
            >
              Create account
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </main>
  );
}

export default SignIn;