
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2, duration: 0.3 } }
};

const linkHoverVariants = {
  hover: { scale: 1.02, originX: 0 },
  tap: { scale: 0.98 }
};

const navItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 + 0.4 }
  })
};

function SettingsLayout() {
const location = useLocation();

return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gradient-to-br from-rose-50 to-rose-100">
        <div className="sm:w-64 bg-white sm:border-r shadow-lg">
            <div className="sm:hidden p-4 border-b">
            <Link to="/home" className="flex items-center text-rose-600">
                <ArrowLeft className='h-5 w-5'/>
                <span className="ml-2">Back</span>
            </Link>
            </div>
        <div className="hidden sm:flex items-center space-x-2 p-6">
            <Link to="/home" className="flex items-center space-x-2 group">
                <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center text-rose-600"
                >
                <ArrowLeft className='h-5 w-5'/>
                <span className="ml-2">Back</span>
                </motion.div>
            </Link>
        </div>
        <h2 className="hidden sm:block text-2xl font-bold px-6 mb-8 text-gray-800">Settings</h2>
        <nav className="sm:px-6 overflow-x-auto">
          <ul className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-3 p-4 sm:p-0">
            {['Account', 'Privacy', 'Personal'].map((item, i) => (
              <motion.li
                key={item}
                custom={i}
                variants={navItemVariants}
                className="flex-shrink-0 sm:flex-shrink"
              >
                <Link
                  to={`/settings/${item.toLowerCase()}`}
                  className="relative block py-2 px-4 rounded-lg transition-colors
                    hover:bg-rose-50 text-gray-600 hover:text-rose-600
                    whitespace-nowrap sm:whitespace-normal
                    group"
                >
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={linkHoverVariants}
                    className="flex items-center"
                  >
                    <span className="z-10 relative text-sm sm:text-base">{item} Settings</span>
                    {location.pathname.includes(item.toLowerCase()) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-rose-100 rounded-lg"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
    </div>

    <motion.main
        initial="hidden"
        animate="visible"
        variants={contentVariants}
        className="flex-1 p-4 sm:p-8"
    >
        <AnimatePresence mode='wait'>
            <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            >
            <Outlet />
            </motion.div>
        </AnimatePresence>
    </motion.main>
    </div>
  );
}

export default SettingsLayout;