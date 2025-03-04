import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Home, MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
    
    // Reset form after successful animation
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  const sidebarVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        delay: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Contact info items for the sidebar
  const contactInfo = [
    { icon: Phone, text: "+1 (555) 123-4567", label: "Call us" },
    { icon: Mail, text: "LifeLog@gmail.com", label: "Email us" },
    { icon: MapPin, text: "123 Main Street, City, State", label: "Visit us" }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div 
        className="lg:w-64 p-6 bg-gradient-to-b from-blue-600 to-purple-700 text-white lg:min-h-screen"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-12 mt-4">
          <motion.div 
            className="flex items-center justify-center mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare size={40} className="mr-2" />
            <h2 className="text-2xl font-bold">Contact</h2>
          </motion.div>
          
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center lg:items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <div className="flex items-center mb-2">
                  <item.icon size={20} className="mr-2" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <p className="text-sm opacity-90">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-auto"
          whileHover={{ scale: 1.05 }}
        >
          <Link 
            to="/home" 
            className="flex items-center justify-center lg:justify-start p-3 bg-white/10 rounded-lg hover:bg-white/20 transition duration-300"
          >
            <Home size={20} className="mr-2" />
            <span>Return Home</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 p-6 lg:p-10 flex items-center justify-center">
        <motion.div 
          className="w-full max-w-lg bg-white rounded-xl shadow-lg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="p-6">
            <motion.h1 
              className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Contact Us
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 text-center mb-8"
              variants={itemVariants}
            >
              We'd love to hear from you! Fill out the form below to get in touch.
            </motion.p>
            
            {submitted ? (
              <motion.div 
                className="bg-green-50 p-6 rounded-lg mb-6 flex flex-col items-center"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <CheckCircle className="text-green-500 mb-2 h-12 w-12" />
                <h2 className="text-xl font-semibold text-green-700">Thank you for contacting us!</h2>
                <p className="text-green-600 text-center mt-2">We'll get back to you as soon as possible.</p>
                <div className="flex mt-6 space-x-4">
                  <motion.button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </motion.button>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/home" 
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
                    >
                      <Home size={16} className="mr-2" />
                      Home
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                    Name
                  </label>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`transition-all duration-300 ${focused === 'name' ? 'shadow-md ring-2 ring-blue-300' : 'shadow'}`}
                  >
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      required
                      className="w-full p-3 rounded-lg border-transparent focus:border-blue-500 focus:outline-none transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`transition-all duration-300 ${focused === 'email' ? 'shadow-md ring-2 ring-blue-300' : 'shadow'}`}
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      required
                      className="w-full p-3 rounded-lg border-transparent focus:border-blue-500 focus:outline-none transition-all duration-300"
                      placeholder="Your email address"
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
                    Subject
                  </label>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`transition-all duration-300 ${focused === 'subject' ? 'shadow-md ring-2 ring-blue-300' : 'shadow'}`}
                  >
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused('subject')}
                      onBlur={() => setFocused(null)}
                      required
                      className="w-full p-3 rounded-lg border-transparent focus:border-blue-500 focus:outline-none transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                    Message
                  </label>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`transition-all duration-300 ${focused === 'message' ? 'shadow-md ring-2 ring-blue-300' : 'shadow'}`}
                  >
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      required
                      rows="4"
                      className="w-full p-3 rounded-lg border-transparent focus:border-blue-500 focus:outline-none transition-all duration-300"
                      placeholder="Tell us what you need"
                    ></textarea>
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex space-x-4">
                  <motion.button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-md flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Submit</span>
                    <Send size={16} />
                  </motion.button>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="lg:hidden"
                  >
                    <Link 
                      to="/home" 
                      className="py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md flex items-center justify-center"
                    >
                      <Home size={16} />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;