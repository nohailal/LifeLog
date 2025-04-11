import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';


const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

const socialButtonVariants = {
  hover: { 
    scale: 1.1, 
    rotate: [0, -5, 5, 0],
    transition: {
      rotate: {
        duration: 0.5,
        repeat: 0,
        ease: "easeInOut"
      }
    }
  },
  tap: { scale: 0.9 }
};

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      type: "spring",
      stiffness: 60,
      damping: 12
    }
  }
};

const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: "spring",
      stiffness: 70,
      damping: 10
    }
  })
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0px 8px 20px rgba(250,172,168,0.4)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.95,
    boxShadow: "0px 2px 5px rgba(250,172,168,0.3)",
  }
};
const SocialButton = ({ Icon, label, onClick }) => (
  <motion.div
    variants={socialButtonVariants}
    whileHover="hover"
    whileTap="tap"
  >
    <Button
      variant="outline"
      className="w-full h-11 bg-white hover:bg-gray-50 border justify-center items-center group"
      aria-label={`Sign up with ${label}`}
      onClick={onClick}
    >
      <Icon className="w-5 h-5 text-gray-600 group-hover:text-rose-600 transition-colors" />
    </Button>
  </motion.div>
);


const PasswordStrength = ({ password }) => {
  if (!password) return null;
  
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthText = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][strength - 1] || '';
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'][strength - 1] || '';

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Password Strength: {strengthText}</span>
      </div>
      <div className="flex gap-1 mt-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className={`h-1 flex-1 rounded-full ${i <= strength ? strengthColor : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const watchPassword = form.watch('password', '');

  const onSubmit = async (data) => {
    setFormError('');
    setIsSubmitting(true);
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      
      if (data.email === 'existing@example.com') {
        throw new Error('Email already in use');
      }
      
      setFormSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setFormError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToTerms = (e) => {
    e.preventDefault();
    navigate('/terms');
  };

  const navigateToPrivacy = (e) => {
    e.preventDefault();
    navigate('/privacy');
  };

  const handleSocialLogin = (provider) => {
    console.log(`Signing in with ${provider}`);
    
  };

  const SuccessConfetti = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            opacity: 1, 
            top: "50%", 
            left: "50%" 
          }}
          animate={{ 
            opacity: 0,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: Math.random() * 720 - 360,
            scale: Math.random() * 1.5 + 0.5,
          }}
          transition={{ 
            duration: Math.random() * 2 + 1,
            ease: ["easeOut", "easeInOut", "circOut"][Math.floor(Math.random() * 3)]
          }}
        >
          <div 
            style={{
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              backgroundColor: ['#FAACA8', '#DDD6F3', '#ff6b6b', '#64dfdf', '#80ffdb', '#ffafcc', '#ffd166', '#06d6a0', '#118ab2'][Math.floor(Math.random() * 9)],
              borderRadius: ['50%', '0%', '30%', '5px'][Math.floor(Math.random() * 4)],
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <main className="w-full flex min-h-screen">
      {formSuccess && <SuccessConfetti />}
      
      {/* Left Section */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex bg-gradient-to-r from-[#FAACA8] to-[#DDD6F3] overflow-hidden"
      >
        {/* Background animated shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute rounded-full opacity-30"
              style={{
                background: i % 2 === 0 ? "linear-gradient(45deg, #ff9a9e, #fad0c4)" : "linear-gradient(45deg, #a18cd1, #fbc2eb)",
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
                scale: [1, Math.random() * 0.2 + 0.9, 1],
                rotate: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-md p-8">
          <motion.img 
            src={logo} 
            alt="LifeLog Logo" 
            width={150} 
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.8, type: "spring" }
            }}
          />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
            className="mt-16 space-y-6"
          >
            <h3 className="text-black text-4xl font-bold leading-tight">Start tracking your daily activities</h3>
            <p className="text-gray-700 text-lg">"Preserve your journey, one moment at a time."</p>
            
            <motion.div 
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0px 20px 25px rgba(0, 0, 0, 0.1)" 
              }} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="bg-white/20 backdrop-blur-sm border-none shadow-md mt-8">
                <CardContent className="p-6">
                  <blockquote className="italic text-gray-800">
                    "LifeLog has transformed how I document my life's moments. It's intuitive and powerful."
                  </blockquote>
                  <div className="mt-4 text-sm font-medium">— Sarah Johnson, Designer</div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 opacity-50"
          animate={{
            background: [
              "linear-gradient(to bottom right, #ffffff, #f5f5f5)", 
              "linear-gradient(to bottom right, #f9f9f9, #f0f0f0)",
              "linear-gradient(to bottom right, #ffffff, #f5f5f5)"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full max-w-md space-y-6 px-6 py-8 bg-white text-gray-600 sm:px-8 rounded-lg shadow-lg relative z-10"
        >
          <div>
            <img 
              src={logo} 
              alt="LifeLog Logo" 
              width={120} 
              className="lg:hidden mb-6" 
              loading="lazy"
            />
            <CardHeader className="p-0">
              <CardTitle className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Create your account
              </CardTitle>
              <CardDescription className="mt-2">
                Already have an account?{' '}
                <motion.span whileHover={{ scale: 1.1 }} style={{ display: 'inline-block' }}>
                  <a 
                    href="/login" 
                    className="font-medium text-rose-600 hover:text-rose-500 underline-offset-4 hover:underline"
                    aria-label="Log in to existing account"
                  >
                    Log in
                  </a>
                </motion.span>
              </CardDescription>
            </CardHeader>
          </div>

          {/* Social Login Buttons */}
          <motion.div 
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-3"
            variants={formVariants}
          >
            <SocialButton 
              Icon={FaGoogle} 
              label="Google" 
              onClick={() => handleSocialLogin('google')} 
            />
            <SocialButton 
              Icon={FaTwitter} 
              label="Twitter" 
              onClick={() => handleSocialLogin('twitter')} 
            />
            <SocialButton 
              Icon={FaFacebook} 
              label="Facebook" 
              onClick={() => handleSocialLogin('facebook')} 
            />
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Separator className="my-4" />
            <motion.span 
              className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Or continue with
            </motion.span>
          </motion.div>

          {/* Form Error Message */}
          <AnimatePresence>
            {formError && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign Up Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <motion.div
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <motion.div 
                            whileHover={{ y: -3, scale: 1.01 }} 
                            whileFocus={{ scale: 1.01 }} 
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="border focus:border-rose-600 transition-all duration-300"
                              aria-label="Enter your full name"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <motion.div 
                            whileHover={{ y: -3, scale: 1.01 }} 
                            whileFocus={{ scale: 1.01 }} 
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Input 
                              type="email" 
                              placeholder="you@example.com" 
                              {...field} 
                              className="border focus:border-rose-600 transition-all duration-300"
                              aria-label="Enter your email address"
                            />
                          </motion.div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <motion.div 
                            whileHover={{ y: -3, scale: 1.01 }} 
                            whileFocus={{ scale: 1.01 }} 
                            transition={{ type: "spring", stiffness: 400 }}
                            className="relative"
                          >
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              {...field} 
                              className="pr-10 border focus:border-rose-600 transition-all duration-300" 
                              aria-label="Enter your password"
                            />
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-rose-600"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? 
                                  <EyeOff className="h-4 w-4" /> : 
                                  <Eye className="h-4 w-4" />
                                }
                              </Button>
                            </motion.div>
                          </motion.div>
                        </FormControl>
                        <PasswordStrength password={watchPassword} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={staggerVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                  className="pt-2"
                >
                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white relative overflow-hidden group"
                      disabled={isSubmitting}
                      aria-label="Create account"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? "Creating account..." : "Create account"}
                      </span>
                      {isSubmitting && (
                        <motion.div 
                          className="absolute inset-0 bg-rose-700 opacity-30"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.5,
                            ease: "linear"
                          }}
                        />
                      )}
                      {!isSubmitting && (
                        <motion.div 
                          className="absolute inset-0 bg-rose-700 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ type: "tween", ease: "easeOut", duration: 0.4 }}
                        />
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </Form>
          </motion.div>
          
          {/* Terms and Privacy */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            By creating an account, you agree to our{' '}
            <motion.span 
              whileHover={{ scale: 1.1, color: "#e11d48" }} 
              style={{ display: 'inline-block' }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <a 
                href="/terms" 
                className="text-rose-600 hover:underline"
                onClick={navigateToTerms}
                aria-label="View Terms of Service"
              >
                Terms of Service
              </a>
            </motion.span>{' '}
            and{' '}
            <motion.span 
              whileHover={{ scale: 1.1, color: "#e11d48" }} 
              style={{ display: 'inline-block' }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <a 
                href="/privacy" 
                className="text-rose-600 hover:underline"
                onClick={navigateToPrivacy}
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </a>
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}

export default SignIn;