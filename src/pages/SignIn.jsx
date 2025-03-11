import React, { useState } from 'react';
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

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
});

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    console.log('Form submitted', data);
    // Here you would typically send the data to your API
    try {
      // Mock API call
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      setFormError('An error occurred. Please try again.');
    }
  };

  const socialButtonVariants = {
    hover: { scale: 1.05 },
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
    <main className="w-full flex min-h-screen">
      {/* Left Section - Gradient Background with Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex bg-gradient-to-r from-[#FAACA8] to-[#DDD6F3]"
      >
        <div className="relative z-10 w-full max-w-md p-8">
          <motion.img 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            src={logo} 
            alt="LifeLog Logo" 
            width={150} 
            className="mb-8"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-16 space-y-6"
          >
            <h3 className="text-black text-4xl font-bold leading-tight">Start tracking your daily activities</h3>
            <p className="text-gray-700 text-lg">"Preserve your journey, one moment at a time."</p>
            
            <Card className="bg-white/20 backdrop-blur-sm border-none shadow-md mt-8">
              <CardContent className="p-6">
                <blockquote className="italic text-gray-800">
                  "LifeLog has transformed how I document my life's moments. It's intuitive and powerful."
                </blockquote>
                <div className="mt-4 text-sm font-medium">— Sarah Johnson, Designer</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center h-screen">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md space-y-6 px-6 py-8 bg-white text-gray-600 sm:px-8"
        >
          <div>
            <img src={logo} alt="LifeLog Logo" width={120} className="lg:hidden mb-6" />
            <CardHeader className="p-0">
              <CardTitle className="text-gray-800 text-2xl font-bold sm:text-3xl">Create your account</CardTitle>
              <CardDescription className="mt-2">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-rose-600 hover:text-rose-500 underline-offset-4 hover:underline">
                  Log in
                </a>
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
            {[
              { Icon: FaGoogle, label: "Google", bgColor: "bg-white hover:bg-gray-50" },
              { Icon: FaTwitter, label: "Twitter", bgColor: "bg-white hover:bg-gray-50" },
              { Icon: FaFacebook, label: "Facebook", bgColor: "bg-white hover:bg-gray-50" }
            ].map(({ Icon, label, bgColor }) => (
              <motion.div
                key={label}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="outline"
                  className={`w-full h-11 ${bgColor} border justify-center items-center`}
                  aria-label={`Sign up with ${label}`}
                >
                  <Icon className="w-5 h-5"/>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="relative">
            <Separator className="my-4" />
            <span className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              Or continue with
            </span>
          </div>

          {/* Form Error Message */}
          <AnimatePresence>
            {formError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
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
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="border focus:border-rose-600"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Input 
                            type="email" 
                            placeholder="you@example.com" 
                            {...field} 
                            className="border focus:border-rose-600"
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="relative"
                        >
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            {...field} 
                            className="pr-10 border focus:border-rose-600" 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-rose-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? 
                              <EyeOff className="h-4 w-4" /> : 
                              <Eye className="h-4 w-4" />
                            }
                          </Button>
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">
                        Must be at least 8 characters with uppercase, lowercase, and numbers
                      </p>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-rose-600 hover:bg-rose-700 text-white"
                  >
                    Create account
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
          
          {/* Terms & Privacy */}
          <p className="text-center text-sm text-gray-500 mt-6">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-rose-600 hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy" className="text-rose-600 hover:underline">Privacy Policy</a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}

export default SignIn;