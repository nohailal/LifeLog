import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Home, MessageSquare, Phone, Mail, MapPin, Clock, ArrowLeft, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setActiveSection("main");

    document.body.classList.add("page-loaded");
    
    return () => {
      document.body.classList.remove("page-loaded");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      console.log("Form Data Submitted:", formData);
      setIsLoading(false);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 500);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
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
    hidden: { x: -30, opacity: 0 },
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

  const contactInfo = [
    { icon: Phone, text: "+1 (555) 123-4567", label: "Call us", hover: "hover:text-blue-300" },
    { icon: Mail, text: "LifeLog@gmail.com", label: "Email us", hover: "hover:text-blue-300" },
    { icon: MapPin, text: "123 Main Street, AL Hoceima", label: "Visit us", hover: "hover:text-blue-300" },
    { icon: Clock, text: "Mon-Fri: 9AM-5PM", label: "Business hours", hover: "hover:text-blue-300" }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter },
    { name: "Facebook", icon: Facebook },
    { name: "Instagram", icon: Instagram },
    { name: "Linkedin", icon: Linkedin }
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-blue-400 to-blue-500 opacity-10 rounded-b-[50%] transform -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200 opacity-20 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-blue-300 opacity-10 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-blue-100 opacity-30 rounded-full"></div>
      
      {/* Sidebar */}
      <motion.div 
        className="lg:w-80 p-8 bg-gradient-to-b from-blue-500 to-blue-600 text-white lg:min-h-screen rounded-r-3xl shadow-xl relative overflow-hidden"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10">
          <motion.div 
            className="flex items-center justify-start mb-12 mt-4"
            whileHover={{ scale: 1.03 }}
          >
            <MessageSquare size={28} className="mr-3 text-blue-100" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Connect With Us</h2>
          </motion.div>
          
          <div className="space-y-10 mb-16">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-start group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                whileHover={{ x: 5 }}
              >
                <div className="bg-white/10 p-3 rounded-lg mr-4 group-hover:bg-white/20 transition-all duration-300">
                  <item.icon size={20} className="text-blue-100" />
                </div>
                <div>
                  <span className="text-sm font-medium text-blue-100 uppercase tracking-wider block mb-1">{item.label}</span>
                  <p className="text-white text-base group-hover:text-blue-100 transition-colors">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-3">Follow Us</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="bg-white/10 p-3 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ y: -3, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="mt-auto pt-10"
            whileHover={{ scale: 1.02 }}
          >
            <Link 
              to="/home" 
              className="flex items-center justify-start p-4 bg-white/10 rounded-lg hover:bg-white/20 transition duration-300 group"
            >
              <ArrowLeft size={18} className="mr-3 group-hover:translate-x-[-3px] transition-transform" />
              <span className="font-medium">Return to Home</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 p-6 lg:p-10 flex items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div 
              key="success"
              className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-blue-100"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-8">
                <motion.div 
                  className="bg-blue-50 p-8 rounded-xl mb-6 flex flex-col items-center"
                  variants={successVariants}
                >
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-white h-10 w-10" />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-800 mb-2">Message Sent!</h2>
                  <p className="text-blue-600 text-center mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                    <motion.button
                      className="flex-1 px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSubmitted(false)}
                    >
                      Send another
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(209, 213, 219, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        to="/home" 
                        className="w-full px-5 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center font-medium"
                      >
                        <Home size={16} className="mr-2" />
                        Home
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-blue-100"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-8">
                <motion.div className="text-center mb-8" variants={itemVariants}>
                  <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">Contact Us</span>
                  <h1 className="text-3xl font-bold mb-2 text-gray-800">Get in Touch</h1>
                  <p className="text-gray-500">We'd love to hear from you. Fill out the form below.</p>
                </motion.div>
                
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
                      className={`relative transition-all duration-300 ${focused === 'name' ? 'shadow-md ring-2 ring-blue-300' : 'shadow-sm'}`}
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
                        className="w-full p-3 rounded-lg border-gray-100 bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 pl-4"
                        placeholder="Your full name"
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                      Email
                    </label>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={`relative transition-all duration-300 ${focused === 'email' ? 'shadow-md ring-2 ring-blue-300' : 'shadow-sm'}`}
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
                        className="w-full p-3 rounded-lg border-gray-100 bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 pl-4"
                        placeholder="your.email@example.com"
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
                      Subject
                    </label>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={`relative transition-all duration-300 ${focused === 'subject' ? 'shadow-md ring-2 ring-blue-300' : 'shadow-sm'}`}
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
                        className="w-full p-3 rounded-lg border-gray-100 bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 pl-4"
                        placeholder="What's this regarding?"
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">
                      Message
                    </label>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={`relative transition-all duration-300 ${focused === 'message' ? 'shadow-md ring-2 ring-blue-300' : 'shadow-sm'}`}
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
                        className="w-full p-3 rounded-lg border-gray-100 bg-white focus:border-blue-500 focus:outline-none transition-all duration-300 pl-4"
                        placeholder="How can we help you today?"
                      ></textarea>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-lg shadow-md flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all duration-300 relative overflow-hidden"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="text-center text-xs text-gray-500 mt-6">
                    By submitting this form, you agree to our <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>.
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactPage;