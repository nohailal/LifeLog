import React from 'react';
import Navbar from '@/components/layout/navbar';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-transparent ">
      <Navbar />
      <motion.main 
        className="flex-grow"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.main>
      
    </div>
  );
};

export default MainLayout;