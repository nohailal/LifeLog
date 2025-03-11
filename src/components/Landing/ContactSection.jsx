import React from "react";
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function ContactSection() {
    const contactMethods = [
        {
            icon: <MapPin size={24} />,
            contact: "Al Hoceima Morocco.",
            title: "Our office"
        },
        {
            icon: <Phone size={24} />,
            contact: "+212 (555) 000-000",
            title: "Phone"
        },
        {
            icon: <Mail size={24} />,
            contact: "LifeLog@gmail.com",
            title: "Email"
        },
    ];

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
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.main 
            className="py-14 bg-gradient-to-b from-white to-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <motion.div 
                    className="max-w-xl space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                    >
                        <Badge variant="outline" className="text-purple-600 font-semibold px-3 py-1 bg-purple-50">
                            LifeLog
                        </Badge>
                    </motion.div>
                    <motion.p 
                        className="text-gray-800 text-3xl font-semibold sm:text-4xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Why Lifelog?
                    </motion.p>
                    <motion.p
                        className="text-gray-600 leading-relaxed"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Because your story deserves to be recorded, your goals deserve to be achieved, 
                        and your journey deserves to be celebrated. 
                        Lifelog isn't just a tool—it's your trusted companion in creating a life you love. 
                        Thank you for being part of our journey. Together, let's make every day count!
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {contactMethods.map((item, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.03
                            }}
                            className="transition-all duration-200"
                        >
                            <Card className="border border-gray-100 hover:border-purple-100">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-gray-800 text-lg font-medium">
                                        {item.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-x-3">
                                        <motion.div 
                                            className="flex-none text-purple-600"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                        <p className="text-gray-700">{item.contact}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.main>
    );
}

export default ContactSection;