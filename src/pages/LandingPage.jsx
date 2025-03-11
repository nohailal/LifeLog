import React, { Suspense} from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Header from "../components/Landing/Header";
import Footer from "../components/Landing/Footer";
import HeroSection from "../components/Landing/HeroSection";
import ShowcaseSection from "../components/Landing/ShowcaseSection";
import ContactSection from "../components/Landing/ContactSection";



function LandingPage() {
  const { scrollYProgress } = useScroll();
  const blobOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.1]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative overflow-hidden"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="fixed inset-0  -z-10 min-h-screen" />
        
        <motion.div className="relative z-10" variants={sectionVariants}>
          <Header />
        </motion.div>

        <motion.main className="relative z-10 pt-16">
          <Suspense fallback={<div></div>}>
            <motion.div variants={sectionVariants}><HeroSection /></motion.div>
            <motion.div variants={sectionVariants} className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none" />
              <ShowcaseSection />
            </motion.div>
            <motion.div variants={sectionVariants}><ContactSection /></motion.div>
            <motion.div variants={sectionVariants}><Footer /></motion.div>
          </Suspense>
        </motion.main>

        {/* Decorative Animated Blobs */}
        <motion.div
          className="fixed top-0 left-0 w-full h-full pointer-events-none"
          style={{ opacity: blobOpacity }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default LandingPage;