import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import logo from '../images/logo.png';

// Define form validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

// Array of fun motivational messages
const welcomeMessages = [
  "Welcome back, awesome human!",
  "Hey there, good to see you!",
  "Welcome back, superstar!",
  "Hello again, feeling productive?",
  "Ready for another amazing day?",
  "The adventure continues!",
  "Back for more awesomeness?",
  "Let's make today count!",
];

// Array of fun placeholder emails
const emailPlaceholders = [
  "superhero@example.com",
  "awesome.person@example.com",
  "rockstar@example.com",
  "future.legend@example.com",
  "brilliant.mind@example.com",
];

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState(welcomeMessages[0]);
    const [emailPlaceholder, setEmailPlaceholder] = useState(emailPlaceholders[0]);
    const [confetti, setConfetti] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [theme, setTheme] = useState('default');

    // Initialize form with react-hook-form and zod validation
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: '',
        password: '',
        rememberMe: false
      }
    });

    // Rotate welcome messages
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
      setWelcomeMessage(welcomeMessages[randomIndex]);
      
      const randomEmailIndex = Math.floor(Math.random() * emailPlaceholders.length);
      setEmailPlaceholder(emailPlaceholders[randomEmailIndex]);
    }, []);

    // Track mouse for interactive effects
    useEffect(() => {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    // Theme toggler
    const toggleTheme = () => {
      setTheme(theme === 'default' ? 'cosmic' : 'default');
    };

    const onSubmit = (data) => {
      setIsLoading(true);
      console.log('Login submitted', data);
      // Simulate API call
      setTimeout(() => {
        try {
          // Mock login logic
          setIsLoading(false);
          // Show confetti before navigating
          setConfetti(true);
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } catch (error) {
          setIsLoading(false);
          setFormError('Invalid login credentials. Please try again.');
        }
      }, 1500);
    };

    // Main container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.6,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Card animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        },
        hover: {
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
            y: -5,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    };

    // Item animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 200, 
                damping: 20 
            }
        }
    };

    // Background gradient animation
    const gradientVariants = {
        default: { 
            background: [
                "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)",
                "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,240,245,1) 100%)",
                "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,250,1) 100%)",
                "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)"
            ],
            transition: { 
                duration: 15, 
                repeat: Infinity, 
                repeatType: "reverse" 
            }
        },
        cosmic: {
            background: [
                "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
                "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
            ],
            transition: { 
                duration: 15, 
                repeat: Infinity, 
                repeatType: "reverse" 
            }
        }
    };

    // Logo animation
    const logoVariants = {
        hidden: { scale: 0.8, opacity: 0, y: -10 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3
            }
        },
        hover: {
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: {
                duration: 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }
        }
    };

    // Generate sparkle elements
    const renderSparkles = () => {
        if (!confetti) return null;
        
        return Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 8 + 4;
            const left = Math.random() * 100;
            const animDuration = Math.random() * 2 + 1;
            const delay = Math.random() * 0.5;
            
            return (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                        top: -20,
                        left: `${left}%`,
                    }}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ 
                        y: window.innerHeight,
                        opacity: [1, 1, 0],
                        x: Math.random() * 100 - 50,
                    }}
                    transition={{
                        duration: animDuration,
                        delay: delay,
                        ease: "easeOut"
                    }}
                />
            );
        });
    };

    // Floating orbs elements
    const renderFloatingOrbs = () => {
        return Array.from({ length: 6 }).map((_, i) => {
            const size = Math.random() * 60 + 40;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const duration = Math.random() * 10 + 15;
            const delay = Math.random() * 5;
            
            return (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${theme === 'cosmic' ? 'bg-blue-500' : 'bg-rose-200'} blur-xl opacity-20`}
                    style={{
                        width: size,
                        height: size,
                        left: `${initialX}%`,
                        top: `${initialY}%`,
                    }}
                    animate={{ 
                        x: [0, 30, -50, 20, 0],
                        y: [0, -40, 20, -30, 0], 
                    }}
                    transition={{
                        duration: duration,
                        delay: delay,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            );
        });
    };

    // Interactive glow effect that follows mouse
    const renderGlowEffect = () => {
        if (theme !== 'cosmic') return null;
        
        return (
            <motion.div
                className="absolute w-64 h-64 rounded-full radial-pulse opacity-20 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(101,78,163,0.8) 0%, rgba(59,38,103,0) 70%)",
                    left: mousePosition.x - 128,
                    top: mousePosition.y - 128,
                }}
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
            />
        );
    };

    return (
        <motion.main 
            className={`w-full min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden ${theme === 'cosmic' ? 'text-white' : 'text-gray-600'}`}
            initial="hidden"
            animate={theme === 'cosmic' ? 'cosmic' : 'default'}
            variants={gradientVariants}
        >
            {/* Theme toggle */}
            <motion.button
                className={`absolute top-4 right-4 z-20 p-2 rounded-full ${theme === 'cosmic' ? 'bg-purple-700 text-white' : 'bg-rose-100 text-rose-600'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
            >
                <Sparkles className="w-5 h-5" />
            </motion.button>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {renderFloatingOrbs()}
                {renderGlowEffect()}
            </div>

            {/* Confetti effect */}
            {renderSparkles()}

            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-md w-full space-y-6 relative z-10"
            >
                <motion.div 
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <Card className={`border-none overflow-hidden shadow-lg rounded-xl ${theme === 'cosmic' ? 'bg-slate-900/70 backdrop-blur-md text-white' : 'bg-white/90 backdrop-blur-md'}`}>
                        <CardHeader className="space-y-2 text-center pb-6">
                            <motion.div variants={logoVariants} whileHover="hover" className="flex justify-center mb-2">
                            <motion.img 
                                        src={logo} 
                                        width={150} 
                                        className={`mx-auto ${theme === 'cosmic' ? 'invert' : ''}`}
                                        alt="LifeLog Logo"
                            />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <CardTitle className={`text-2xl font-bold tracking-tight sm:text-3xl ${theme === 'cosmic' ? 'text-white' : 'text-gray-800'}`}>
                                    {welcomeMessage}
                                </CardTitle>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <CardDescription className={theme === 'cosmic' ? 'text-gray-300' : 'text-gray-500'}>
                                    Enter your credentials to continue your journey
                                </CardDescription>
                            </motion.div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            {/* Form Error Message */}
                            <AnimatePresence>
                                {formError && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="mb-4"
                                    >
                                        <Alert variant="destructive" className={`text-sm ${theme === 'cosmic' ? 'border-red-800 bg-red-900/40 text-red-200' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{formError}</AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Email Field */}
                                    <motion.div variants={itemVariants}>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={theme === 'cosmic' ? 'text-gray-200' : 'text-gray-700'}>Email</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder={emailPlaceholder} 
                                                            {...field} 
                                                            className={`h-11 border ${theme === 'cosmic' ? 'bg-slate-800/50 border-purple-700/50 focus:border-purple-500 focus:ring-purple-500/20 text-white' : 'border-gray-200 focus:border-rose-400 focus:ring-rose-200 text-gray-800'} rounded-lg shadow-sm`}
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-rose-500" />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    {/* Password Field */}
                                    <motion.div variants={itemVariants}>
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={theme === 'cosmic' ? 'text-gray-200' : 'text-gray-700'}>Password</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input 
                                                                type={showPassword ? "text" : "password"} 
                                                                {...field} 
                                                                className={`h-11 pr-10 border ${theme === 'cosmic' ? 'bg-slate-800/50 border-purple-700/50 focus:border-purple-500 focus:ring-purple-500/20 text-white' : 'border-gray-200 focus:border-rose-400 focus:ring-rose-200 text-gray-800'} rounded-lg shadow-sm`}
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                className={`absolute right-0 top-0 h-full px-3 py-2 ${theme === 'cosmic' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-400 hover:text-rose-600'}`}
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                <AnimatePresence mode="wait" initial={false}>
                                                                    <motion.div
                                                                        key={showPassword ? 'eye-off' : 'eye'}
                                                                        initial={{ opacity: 0, rotateY: 90 }}
                                                                        animate={{ opacity: 1, rotateY: 0 }}
                                                                        exit={{ opacity: 0, rotateY: -90 }}
                                                                        transition={{ duration: 0.2 }}
                                                                    >
                                                                        {showPassword ? 
                                                                            <EyeOff className="h-4 w-4" /> : 
                                                                            <Eye className="h-4 w-4" />
                                                                        }
                                                                    </motion.div>
                                                                </AnimatePresence>
                                                            </Button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-rose-500" />
                                                </FormItem>
                                            )}
                                        />
                                    </motion.div>

                                    {/* Remember Me & Forgot Password */}
                                    <motion.div variants={itemVariants}>
                                        <div className="flex items-center justify-between">
                                            <FormField
                                                control={form.control}
                                                name="rememberMe"
                                                render={({ field }) => (
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox 
                                                            id="rememberMe" 
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            className={`rounded ${theme === 'cosmic' ? 'data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600' : 'data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600'}`}
                                                        />
                                                        <label
                                                            htmlFor="rememberMe"
                                                            className={`text-sm font-medium leading-none ${theme === 'cosmic' ? 'text-gray-300' : 'text-gray-600'} peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                )}
                                            />
                                            <Button
                                                variant="link"
                                                className={`text-sm ${theme === 'cosmic' ? 'text-purple-400 hover:text-purple-300' : 'text-rose-600 hover:text-rose-700'} px-0 font-medium`}
                                                onClick={() => navigate("/forgot-password")}
                                            >
                                                Forgot password?
                                            </Button>
                                        </div>
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="pt-2"
                                    >
                                        <Button 
                                            type="submit" 
                                            className={`w-full h-12 font-medium rounded-lg shadow-md disabled:opacity-70 disabled:cursor-not-allowed ${theme === 'cosmic' 
                                                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white shadow-purple-500/30' 
                                                : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white shadow-rose-200/50'
                                            }`}
                                            disabled={isLoading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <AnimatePresence mode="wait" initial={false}>
                                                {isLoading ? (
                                                    <motion.div
                                                        key="loading"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center"
                                                    >
                                                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                                        <span>Beaming you in...</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="sign-in"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center justify-center"
                                                    >
                                                        <span>Let's go!</span>
                                                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Button>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className={`w-full border-t ${theme === 'cosmic' ? 'border-gray-700' : 'border-gray-200'}`}></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className={`px-4 ${theme === 'cosmic' ? 'bg-slate-900 text-gray-400' : 'bg-white text-gray-500'}`}>Or continue with</span>
                                        </div>
                                    </motion.div>

                                    {/* Google SSO Button */}
                                    <motion.div variants={itemVariants}>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className={`w-full h-12 font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                                                theme === 'cosmic' 
                                                ? 'border border-gray-700 bg-slate-800/70 hover:bg-slate-700 text-white' 
                                                : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
                                            }`}
                                            whileHover={{ 
                                                boxShadow: theme === 'cosmic' 
                                                    ? "0 4px 20px rgba(79, 70, 229, 0.2)" 
                                                    : "0 4px 12px rgba(0, 0, 0, 0.05)",
                                                y: -2
                                            }}
                                            whileTap={{ y: 0 }}
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_17_40)">
                                                    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                                    <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                                    <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                                    <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_17_40">
                                                        <rect width="48" height="48" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            Continue with Google
                                        </Button>
                                    </motion.div>
                                </form>
                            </Form>

                            {/* Sign Up Link */}
                            <motion.div 
                                variants={itemVariants}
                                className="text-center mt-6"
                            >
                                <p className={`text-sm ${theme === 'cosmic' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Don't have an account?{' '}
                                    <Button 
                                        variant="link" 
                                        className={`p-0 font-medium ${theme === 'cosmic' ? 'text-purple-400 hover:text-purple-300' : 'text-rose-600 hover:text-rose-700'}`}
                                        onClick={() => navigate("/signin")}
                                    >
                                        Sign up
                                    </Button>
                                </p>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Footer text */}
            <motion.p 
                className={`text-center text-xs mt-8 ${theme === 'cosmic' ? 'text-gray-500' : 'text-gray-400'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                © 2025 LifeLog. All rights reserved.
            </motion.p>
        </motion.main>
    );
}

export default Login;
