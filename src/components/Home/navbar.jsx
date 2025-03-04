import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  NotebookPen, 
  FileText,
  Menu,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import logo from '../../images/logo.png';

const services = [
  { name: 'Todo list', icon: LayoutGrid, path: '/todo-list' },
  { name: 'Journal', icon: NotebookPen, path: '/journal' },
  { name: 'Blog', icon: FileText, path: '/blog' },
];

const menuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    x: '100%',
    transition: { 
      ease: 'easeInOut',
      duration: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="bg-inherit">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex lg:flex-1">
          <Link to="/lifelog" className="-m-1.5 p-1.5">
            <img src={logo} alt="Logo" className="w-32 h-16" />
          </Link>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex lg:hidden -m-2.5 p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu />
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-x-1 text-black-600/100 font-semibold"
            >
              Services
              <motion.span
                animate={{ rotate: servicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2"
                  transition={{ duration: 0.2 }}
                >
                  {services.map((service) => (
                    <motion.div
                      key={service.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      <Link 
                        to={service.path}
                        className="flex items-center"
                      >
                        <service.icon className="mr-2 w-5 h-5 text-gray-500" />
                        {service.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {['Home', 'Contact', 'Settings'].map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="text-black-600/100 font-semibold"
            >
              <Link 
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-current hover:after:w-full after:transition-all after:duration-300"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm"
              >
                <div className="flex items-center justify-between">
                  <Link to="/lifelog" className="-m-1.5 p-1.5">
                    <img src={logo} alt="Logo" className="h-8 w-auto" />
                  </Link>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X />
                  </motion.button>
                </div>

                <motion.div 
                  className="mt-6 flow-root"
                  initial="hidden"
                  animate="visible"
                >
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <motion.div className="space-y-2 py-6">
                      <motion.div className="group">
                        <motion.button
                          className="flex w-full items-center justify-between rounded-lg py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        >
                          Services
                          <motion.span
                            animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.span>
                        </motion.button>

                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4"
                            >
                              {services.map((service) => (
                                <motion.div
                                  key={service.name}
                                  variants={itemVariants}
                                  className="py-2"
                                >
                                  <Link
                                    to={service.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center text-sm hover:bg-gray-50 p-2 rounded-md"
                                  >
                                    <service.icon className="mr-2 w-5 h-5 text-gray-500" />
                                    {service.name}
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {['Home', 'Contact', 'Settings'].map((item) => (
                        <motion.div
                          key={item}
                          variants={itemVariants}
                          className="-mx-3"
                        >
                         <Link to={`/${item.toLowerCase().replace(' ', '')}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                          >
                            {item}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}