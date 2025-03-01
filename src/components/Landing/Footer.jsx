
import { motion } from "framer-motion";
import { Facebook, Twitter, Inbox } from 'lucide-react';
import Logo from '../../images/logo.png';

function Footer() {
    const footerNavs = [
        {
            label: "Our Team",
            items: [
                { name: 'Team' },
                { name: 'Blog' },
                
            ],
        },
        {
            label: "Resources",
            items: [
                { name: 'Contact' },
                { name: 'Support' },
            ],
        },
        {
            label: "About",
            items: [
                { name: 'Privacy' },
                { name: 'About US' },
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
            className="text-gray-500 bg-gradient-to-t from-gray-50 to-white px-4 py-12 max-w-screen- mx-auto md:px-8"
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
                        className="w-32"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.form 
                        onSubmit={(e) => e.preventDefault()}
                        className="mt-6"
                        variants={itemVariants}
                    >
                        <motion.label className="block text-gray-700 font-medium pb-2">
                            Stay up to date
                        </motion.label>
                        <div className="flex items-center gap-2">
                            <motion.input 
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg outline-none border border-gray-200 focus:border-purple-400 transition-colors duration-200"
                                whileFocus={{ scale: 1.01 }}
                            />
                            <motion.button
                                className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.form>
                </motion.div>
                <motion.div 
                    className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0"
                    variants={containerVariants}
                >
                    {footerNavs.map((item, idx) => (
                        <motion.ul
                            className="space-y-4"
                            key={idx}
                            variants={itemVariants}
                        >
                            <h4 className="text-gray-800 font-medium">
                                {item.label}
                            </h4>
                            {item.items.map((el, idx) => (
                                <motion.li 
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <a 
                                        href="#"
                                        className="hover:text-purple-600 transition-colors duration-200"
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
                className="mt-8 py-6 border-t border-gray-100 items-center justify-between sm:flex"
                variants={itemVariants}
            >
                <motion.div variants={itemVariants}>
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
                                    className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors duration-200"
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
