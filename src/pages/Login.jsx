import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
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

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState('');

    // Initialize form with react-hook-form and zod validation
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: '',
        password: '',
        rememberMe: false
      }
    });

    const onSubmit = (data) => {
      console.log('Login submitted', data);
      try {
        // Mock login logic
        navigate("/home");
      } catch (error) {
        setFormError('Invalid login credentials. Please try again.');
      }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                staggerChildren: 0.2 
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50">
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-md w-full text-gray-600 space-y-6"
            >
                <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 text-center">
                        <motion.div variants={itemVariants} className="flex justify-center">
                            <motion.img 
                                src={logo} 
                                width={140} 
                                className="mx-auto"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                alt="LifeLog Logo"
                            />
                        </motion.div>
                        <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Welcome back
                        </CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {/* Form Error Message */}
                        <AnimatePresence>
                            {formError && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-4"
                                >
                                    <Alert variant="destructive" className="text-sm">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{formError}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <Input 
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
                                                    transition={{ delay: 0.3 }}
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
                                        </FormItem>
                                    )}
                                />

                                {/* Remember Me & Forgot Password */}
                                <motion.div 
                                    className="flex items-center justify-between"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <FormField
                                        control={form.control}
                                        name="rememberMe"
                                        render={({ field }) => (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id="rememberMe" 
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                                                />
                                                <label
                                                    htmlFor="rememberMe"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                        )}
                                    />
                                    <Button
                                        variant="link"
                                        className="text-sm text-rose-600 px-0 hover:text-rose-500"
                                        onClick={() => navigate("/forgot-password")}
                                    >
                                        Forgot password?
                                    </Button>
                                </motion.div>

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
                                        Sign in
                                    </Button>
                                </motion.div>

                                {/* Google SSO Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-11 flex items-center justify-center gap-2"
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
                            <p className="text-sm">
                                Don't have an account?{' '}
                                <Button 
                                    variant="link" 
                                    className="p-0 font-medium text-rose-600 hover:text-rose-500"
                                    onClick={() => navigate("/signin")}
                                >
                                    Sign up
                                </Button>
                            </p>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </main>
    );
}

export default Login;