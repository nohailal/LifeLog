import React, { useEffect, useState } from 'react';
import { LuListTodo } from "react-icons/lu";
import { FaMicroblog } from "react-icons/fa";
import { RiHealthBookLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';

function About() {
    const [navbarVisible, setNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        // Handle scroll events for hiding/showing navbar
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setNavbarVisible(false);
            } else {
                setNavbarVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // Navigation bar animation variants
    const navbarVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { y: -100, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }
    };

    return (
        <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen overflow-hidden">
            {/* Animated Navigation Bar */}
            <AnimatePresence>
                {navbarVisible && (
                    <motion.nav
                        className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md z-50"
                        variants={navbarVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <Link to="/">
                                        <motion.div 
                                            className="flex items-center space-x-2 text-indigo-700"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <IoArrowBack className="text-xl" />
                                            <span className="font-medium">Return</span>
                                        </motion.div>
                                    </Link>
                                </div>
                                <div className="flex items-center">
                                    <motion.h2 
                                        className="text-xl font-bold text-indigo-700"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    >
                                        LifeLog
                                    </motion.h2>
                                </div>
                                <div className="hidden md:flex items-center space-x-6">
                                    <motion.div
                                        className="relative group"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                       
                                    </motion.div>
                                    <motion.div
                                        className="relative group"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    />
                                      
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Hero Section with subtle pattern overlay - adjusted for navbar */}
            <motion.div 
                className="relative pt-28 pb-20 px-6" // Added top padding to account for navbar
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-indigo-100"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.h1 
                            className="text-5xl font-bold text-indigo-700 mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            LifeLog
                        </motion.h1>
                        <motion.p 
                            className="text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            Your personal digital journal, designed to capture every moment and insight of your life journey. Whether you're tracking health, mood, daily tasks, or personal achievements, LifeLog provides a secure and intuitive platform to document, reflect, and understand your life better.
                        </motion.p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Features Section */}
            <motion.section 
                className="py-16 px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-3xl font-bold text-center text-gray-800 mb-16"
                        variants={itemVariants}
                    >
                        Our Services
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div 
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="bg-indigo-600 p-6 flex justify-center">
                                <RiHealthBookLine className="text-white text-4xl" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Journal</h3>
                                <p className="text-gray-600">
                                    Keep track of your well-being with detailed logs that help you reflect on your journey, one step at a time.
                                </p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="bg-indigo-600 p-6 flex justify-center">
                                <LuListTodo className="text-white text-4xl" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">To-Do List</h3>
                                <p className="text-gray-600">
                                    Simplify your tasks and stay productive with our smart and intuitive task manager designed for efficiency.
                                </p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="bg-indigo-600 p-6 flex justify-center">
                                <FaMicroblog className="text-white text-4xl" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Blog</h3>
                                <p className="text-gray-600">
                                    Dive into a world of insights, tips, and inspiration carefully curated to enrich your daily life.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Mission Section */}
            <motion.section 
                className="py-20 px-6 bg-indigo-700 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2 
                        className="text-3xl font-bold mb-8"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Why LifeLog?
                    </motion.h2>
                    <motion.p 
                        className="text-xl mb-6 leading-relaxed"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Because your story deserves to be recorded, your goals deserve to be achieved, and your journey deserves to be celebrated.
                    </motion.p>
                    <motion.p 
                        className="text-lg"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        LifeLog isn't just a tool—it's your trusted companion in creating a life you love. Thank you for being part of our journey. Together, let's make every day count!
                    </motion.p>
                </div>
            </motion.section>

            {/* Testimonial Section (optional) */}
            <motion.section 
                className="py-16 px-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h2 
                        className="text-3xl font-bold text-gray-800 mb-12"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        What Our Users Say
                    </motion.h2>
                    <motion.div 
                        className="bg-white rounded-xl shadow-lg p-8"
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    >
                        <motion.p 
                            className="text-xl italic text-gray-600 mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            "LifeLog has transformed how I track my daily activities and personal growth. The interface is intuitive and the features are exactly what I needed."
                        </motion.p>
                        <motion.p 
                            className="font-semibold text-gray-800"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            — Sarah Johnson, Professional Coach
                        </motion.p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Return to Top button */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: lastScrollY > 300 ? 1 : 0,
                    scale: lastScrollY > 300 ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
            >
                <motion.button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-indigo-600 text-white p-3 rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </motion.button>
            </motion.div>
        </div>
    );
}

export default About;