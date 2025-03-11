import React, { useState } from 'react';
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
  LogOut
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
  { name: 'Todo list', icon: LayoutGrid, path: '/todo-list', description: 'Manage your tasks and stay organized' },
  { name: 'Journal', icon: NotebookPen, path: '/journal', description: 'Record your thoughts and track progress' },
  { name: 'Blog', icon: FileText, path: '/blog', description: 'Share your experiences and insights' },
];

const mainLinks = [
  { name: 'Home', path: '/home', icon: Home },
  { name: 'Contact', path: '/contact', icon: MessageCircle },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  
  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-transparent dark:bg-black border-b border-gray-200/50 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          className="flex lg:flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/home" className="-m-1.5 p-1.5 flex items-center">
            <img src={logo} alt="LifeLog Logo" className="w-28 h-14 object-contain" />
          </Link>
        </motion.div>

        {/* Mobile Menu Trigger */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm p-0">
            <div className="h-full flex flex-col">
              <SheetHeader className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <Link to="/home" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                    <img src={logo} alt="LifeLog Logo" className="h-10 w-auto" />
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </SheetHeader>
              
              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-2 px-6">
                  {/* User Profile in Mobile */}
                  <div className="flex items-center space-x-3 mb-4 py-3 px-2 bg-gray-50 rounded-lg">
                    <Avatar className="h-10 w-10 border-2 border-purple-100">
                      <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Jane Doe</span>
                      <span className="text-xs text-gray-500">jane@example.com</span>
                    </div>
                  </div>
                  
                  {/* Mobile Services Section */}
                  <div className="py-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between font-semibold"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      Services
                      <motion.span 
                        animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.span>
                    </Button>
                    
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden pl-4 space-y-1 mt-1"
                        >
                          {services.map((service) => (
                            <motion.div
                              key={service.name}
                              variants={itemVariants}
                              className="py-1"
                            >
                              <Button
                                variant={isActiveLink(service.path) ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                              >
                                <Link
                                  to={service.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center text-sm"
                                >
                                  <service.icon className="mr-2 h-4 w-4" />
                                  {service.name}
                                </Link>
                              </Button>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  {/* Main Navigation Links */}
                  {mainLinks.map((item) => (
                    <Button
                      key={item.name}
                      variant={isActiveLink(item.path) ? "secondary" : "ghost"}
                      className="w-full justify-start font-semibold"
                      asChild
                    >
                      <Link 
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="border-t p-6">
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50" asChild>
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
        <div className="hidden lg:flex lg:gap-x-6 items-center">
          {/* Services Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {services.map((service) => (
                      <li key={service.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={service.path}
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${
                              isActiveLink(service.path)
                                ? "bg-gray-100"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center">
                              <service.icon className="h-5 w-5 mr-2 text-purple-600" />
                              <div className="text-sm font-medium leading-none">
                                {service.name}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              {service.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Main Navigation Links */}
          {mainLinks.map((item) => (
            <Button 
              key={item.name} 
              variant={isActiveLink(item.path) ? "secondary" : "ghost"} 
              className="font-semibold" 
              asChild
            >
              <Link to={item.path}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </div>

        {/* User Profile (Desktop) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button variant="ghost" className="flex items-center space-x-2" asChild>
            <Link to="/settings/account">
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">Jane Doe</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}