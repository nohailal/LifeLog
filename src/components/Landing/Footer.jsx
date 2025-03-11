import { motion } from "framer-motion";
import { Facebook, Twitter, Inbox } from 'lucide-react';
import Logo from '../../images/logo.png';

function Footer() {
    const footerNavs = [
        {
            label: "Our Team",
            items: [
                { name: 'Team', path:'/Team' },
            ],
        },
        {
            label: "About",
            items: [
                { name: 'About US' ,path: '/About' },
            ]
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.footer 
            className="text-gray-600 bg-gradient-to-br from-gray-50 via-white to-purple-50 px-4 py-12 max-w-screen- mx-auto md:px-8 shadow-lg"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="gap-6 justify-between md:flex">
                <motion.div 
                    className="flex-1"
                    variants={itemVariants}
                >
                    <motion.img 
                        src={Logo} 
                        alt="Logo" 
                        className="w-32 drop-shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.form 
                        onSubmit={(e) => e.preventDefault()}
                        className="mt-6"
                        variants={itemVariants}
                    >
                        <motion.label className="block text-gray-700 font-semibold pb-2">
                            Stay up to date
                        </motion.label>
                        <div className="flex items-center gap-2">
                            <motion.input 
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg outline-none border border-gray-200 focus:border-purple-400 shadow-sm transition-all duration-200 hover:shadow-md"
                                whileFocus={{ scale: 1.01 }}
                            />
                            <motion.button
                                className="px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 shadow-md transition-all duration-200 font-medium"
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.form>
                </motion.div>
                <motion.div 
                    className="flex-1 mt-10 grid grid-cols-2 gap-8 md:mt-0"
                    variants={containerVariants}
                >
                    {footerNavs.map((item, idx) => (
                        <motion.ul
                            className="space-y-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                            key={idx}
                            variants={itemVariants}
                        >
                            <h4 className="text-gray-800 font-bold text-lg pb-2 border-b border-purple-100">
                                {item.label}
                            </h4>
                            {item.items.map((el, idx) => (
                                <motion.li 
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <a 
                                     href={el.path || "#"}  
                                        className="hover:text-purple-600 transition-colors duration-200 font-medium"
                                    >
                                        {el.name}
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    ))}
                </motion.div>
            </div>
            <motion.div 
                className="mt-8 py-6 border-t border-purple-100 items-center justify-between sm:flex"
                variants={itemVariants}
            >
                <motion.div variants={itemVariants} className="text-gray-600 font-medium">
                    &copy; 2024 LifeLog All rights reserved.
                </motion.div>
                <motion.div 
                    className="mt-6 sm:mt-0"
                    variants={itemVariants}
                >
                    <ul className="flex items-center space-x-4">
                        {[
                            { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/" },
                            { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/" },
                            { icon: <Inbox className="w-5 h-5" />, href: "https://www.linkedin.com/" }
                        ].map((item, idx) => (
                            <motion.li 
                                key={idx}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <a 
                                    href={item.href}
                                    className="w-10 h-10 bg-white border border-purple-200 rounded-full flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white hover:border-transparent transition-all duration-200 shadow-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.icon}
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </motion.footer>
    );
}

export default Footer;