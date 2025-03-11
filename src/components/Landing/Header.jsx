import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="w-full h-16  shadow-sm fixed top-0 z-50"
    >
      <nav className="max-w-screen-xl mx-auto h-full">
        <div className="flex items-center justify-between h-full px-4 md:px-6">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-75 transition-opacity"
            aria-label="Go to homepage"
          >
            <motion.img 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={logo} 
              alt="Company Name Logo" 
              title="Company Logo"
              className="w-32 h-auto max-h-16 object-contain"
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
