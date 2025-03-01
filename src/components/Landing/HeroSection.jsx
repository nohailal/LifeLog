import React from "react";
import { motion } from "framer-motion";
import Art from "../../assets/Humaaans - Research.png";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signin");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
      <div className="space-y-4 flex-1 sm:text-center lg:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-black font-bold text-4xl xl:text-5xl"
        >
          Your Life, Your Story.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-800 max-w-xl leading-relaxed sm:mx-auto lg:ml-0"
        >
          "Preserve your journey, one moment at a time."
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignUp}
            className="px-7 py-3 bg-pink-700 hover:bg-pink-800 w-full text-white text-center rounded-md shadow-md block sm:w-auto"
          >
            Get started
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="px-7 py-3 w-full bg-rose-700 hover:bg-rose-800 text-white text-center rounded-md block sm:w-auto"
          >
            Login
          </motion.button>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3"
      >
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={Art} 
          alt="Illustration of research concept"
          className="w-full mx-auto sm:w-10/12 lg:w-full" 
        />
      </motion.div>
    </section>
  );
}

export default HeroSection;
