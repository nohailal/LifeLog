import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  NotebookPen, 
  FileText,
  Menu,
  X,
  ChevronDown,
  Settings,
  Home,
  MessageCircle,
  LogOut,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import logo from '../../images/logo.png';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/theme/ThemeToggle";

const services = [
  { name: 'Todo list', icon: LayoutGrid, path: '/todo-list', description: 'Manage your tasks and stay organized', color: '#FF6B6B' },
  { name: 'Journal', icon: NotebookPen, path: '/journal', description: 'Record your thoughts and track progress', color: '#4ECDC4' },
  { name: 'Blog', icon: FileText, path: '/blog', description: 'Share your experiences and insights', color: '#FFD166' },
];

const mainLinks = [
  { name: 'Home', path: '/home', icon: Home, color: '#FF6B6B' },
  { name: 'Contact', path: '/contact', icon: MessageCircle, color: '#4ECDC4' },
  { name: 'Settings', path: '/settings', icon: Settings, color: '#FFD166' },
];

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const logoVariants = {
  initial: { rotate: 0 },
  hover: { rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);
  const location = useLocation();
  
  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Random sparkle effect function
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showSparkle) {
        setSparklePosition({
          x: Math.random() * 100,
          y: Math.random() * 70
        });
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 1000);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [showSparkle]);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-black/80 border-b border-gray-200/50 shadow-lg">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 opacity-60 pointer-events-none" />
      
      {/* Random sparkle effect */}
      {showSparkle && (
        <motion.div 
          className="absolute pointer-events-none z-10"
          style={{ left: `${sparklePosition.x}%`, top: `${sparklePosition.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1 }}
        >
          <Sparkles className="text-yellow-400 h-6 w-6" />
        </motion.div>
      )}
      
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 relative">
      {/* Logo */}
<motion.div 
  variants={logoVariants}
  initial="initial"
  whileHover="hover"
  className="flex lg:flex-1"
>
  <Link to="/home" className="-m-1.5 p-1.5 flex items-center">
    <motion.img 
      src={logo} 
      alt="LifeLog Logo" 
      className="mx-auto w-28 h-14 object-contain dark:invert" 
      initial={{ filter: 'drop-shadow(0px 0px 0px rgba(139, 92, 246, 0))' }}
      whileHover={{ 
        filter: 'drop-shadow(0px 0px 8px rgba(139, 92, 246, 0.7))',
        scale: 1.05 
      }}
      transition={{ duration: 0.3 }}
    />
  </Link>
</motion.div>

        {/* Mobile Menu Trigger */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/40">
                <Menu className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                <span className="sr-only">Open menu</span>
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm p-0 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black">
            <div className="h-full flex flex-col">
              <SheetHeader className="p-6 border-b border-purple-100 dark:border-purple-900/30">
                <div className="flex items-center justify-between">
                  <Link to="/home" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                    <img src={logo} alt="LifeLog Logo" className="h-10 w-auto" />
                  </Link>
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30">
                      <X className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                    </Button>
                  </motion.div>
                </div>
              </SheetHeader>
              
              <div className="flex-1 overflow-auto py-4">
                <motion.div 
                  className="space-y-2 px-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* User Profile in Mobile */}
                  <motion.div 
                    variants={itemVariants}
                    className="flex items-center space-x-3 mb-4 py-3 px-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl"
                  >
                    <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-gray-800 ring-offset-2 ring-offset-purple-100 dark:ring-offset-purple-900/40">
                      <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">JD</AvatarFallback>
                    </Avatar>
                    <motion.div className="flex flex-col" variants={itemVariants}>
                      <span className="text-sm font-medium">Jane Doe</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">jane@example.com</span>
                    </motion.div>
                  </motion.div>
                  
                  {/* Mobile Services Section */}
                  <motion.div className="py-2" variants={itemVariants}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between font-semibold rounded-lg bg-gradient-to-r from-purple-100/50 to-purple-200/50 hover:from-purple-200/70 hover:to-purple-300/70 dark:from-purple-900/20 dark:to-purple-800/20 dark:hover:from-purple-800/30 dark:hover:to-purple-700/30"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      <span className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                        Services
                      </span>
                      <motion.span 
                        animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5 text-purple-500" />
                      </motion.span>
                    </Button>
                    
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pl-4 space-y-1 mt-2"
                        >
                          {services.map((service) => (
                            <motion.div
                              key={service.name}
                              variants={itemVariants}
                              className="py-1"
                              whileHover={{ x: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <Button
                                variant={isActiveLink(service.path) ? "secondary" : "ghost"}
                                className={`w-full justify-start rounded-lg ${
                                  isActiveLink(service.path) 
                                    ? "bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800/50 dark:to-pink-800/50" 
                                    : "hover:bg-purple-100/50 dark:hover:bg-purple-900/30"
                                }`}
                                asChild
                              >
                                <Link
                                  to={service.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center text-sm"
                                >
                                  <service.icon 
                                    className="mr-2 h-5 w-5" 
                                    style={{ color: service.color }}
                                  />
                                  {service.name}
                                </Link>
                              </Button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  <Separator className="my-3 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 dark:from-purple-800/30 dark:via-pink-800/30 dark:to-purple-800/30" />
                  
                  {/* Main Navigation Links */}
                  {mainLinks.map((item, index) => (
                    <motion.div 
                      key={item.name}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Button
                        variant={isActiveLink(item.path) ? "secondary" : "ghost"}
                        className={`w-full justify-start font-semibold rounded-lg ${
                          isActiveLink(item.path) 
                            ? "bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800/50 dark:to-pink-800/50" 
                            : "hover:bg-purple-100/50 dark:hover:bg-purple-900/30"
                        }`}
                        asChild
                      >
                        <Link 
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <item.icon 
                            className="mr-2 h-5 w-5" 
                            style={{ color: item.color }}
                          />
                          {item.name}
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <div className="border-t border-purple-100 dark:border-purple-900/30 p-6">
                <Button 
                  variant="outline" 
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30 rounded-lg" 
                  asChild
                >
                  <Link to="/logout" onClick={() => setMobileMenuOpen(false)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <motion.div 
          className="hidden lg:flex lg:gap-x-1 items-center bg-white/30 dark:bg-black/30 rounded-full px-2 py-1 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 shadow-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Services Navigation Menu */}
          <motion.div variants={itemVariants}>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-semibold rounded-full bg-transparent hover:bg-purple-100/50 dark:hover:bg-purple-900/30 flex gap-1 items-center">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl rounded-xl border border-purple-100 dark:border-purple-900/30">
                    <motion.ul 
                      className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {services.map((service) => (
                        <motion.li 
                          key={service.name}
                          variants={itemVariants}
                          whileHover={{ scale: 1.03, y: -2 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <NavigationMenuLink asChild>
                            <Link
                              to={service.path}
                              className={`block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors ${
                                isActiveLink(service.path)
                                  ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
                                  : "hover:bg-purple-50 dark:hover:bg-purple-900/20"
                              }`}
                            >
                              <div className="flex items-center">
                                <service.icon className="h-5 w-5 mr-2" style={{ color: service.color }} />
                                <div className="text-sm font-medium leading-none">
                                  {service.name}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400 mt-1">
                                {service.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>

          {/* Main Navigation Links */}
          {mainLinks.map((item) => (
            <motion.div 
              key={item.name}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
            >
              <Button 
                variant={isActiveLink(item.path) ? "secondary" : "ghost"} 
                className={`font-semibold rounded-full ${
                  isActiveLink(item.path)
                    ? "bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800/50 dark:to-pink-800/50 hover:from-purple-300 hover:to-pink-300 dark:hover:from-purple-700/60 dark:hover:to-pink-700/60"
                    : "hover:bg-purple-100/50 dark:hover:bg-purple-900/30"
                }`}
                asChild
              >
                <Link to={item.path}>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="mr-2 h-4 w-4" style={{ color: item.color }} />
                    {item.name}
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* User Profile and Theme Toggle (Desktop) */}
        <motion.div 
          className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <ThemeToggle className="bg-purple-100/50 dark:bg-purple-900/30 rounded-full p-2 mr-2 hover:bg-purple-200/70 dark:hover:bg-purple-800/40" />
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 rounded-full bg-gradient-to-r from-purple-100/50 to-pink-100/50 hover:from-purple-200/70 hover:to-pink-200/70 dark:from-purple-900/20 dark:to-pink-900/20 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 px-3 py-2"
              asChild
            >
              <Link to="/settings/account">
                <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-gray-800 ring-offset-1 ring-offset-purple-100 dark:ring-offset-purple-900/40">
                  <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">JD</AvatarFallback>
                </Avatar>
                <span className="font-medium text-sm ml-2">Queen Me</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </nav>
    </header>
  );
}
