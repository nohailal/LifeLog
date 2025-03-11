import { motion } from "framer-motion";
import { Rss, ListTodo, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const features = [
  {
    icon: <Rss size={28} />,
    title: "Blog",
    desc: "Stay updated with the latest news, tips, and insights through your personal blog section."
  },
  {
    icon: <ListTodo size={28} />,
    title: "TO-DO List",
    desc: "Organize your tasks efficiently and never miss a deadline with this interactive list."
  },
  {
    icon: <Lock size={28} />,
    title: "Journal",
    desc: "Use a journal to untangle your thoughts, track your growth, and turn fleeting moments into lasting reflections."
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const ShowcaseSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        
        {/* Title Section */}
        <motion.div 
          className="relative max-w-2xl mx-auto sm:text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <h3 className="text-gray-900 text-3xl font-bold sm:text-4xl mb-4">
              Let's help you organize your life
            </h3>
            <p className="text-gray-600 mt-3">
              Discover powerful tools designed to streamline your daily routine and boost productivity.
            </p>
          </div>
          
          {/* Gradient Background */}
          <div 
            className="absolute inset-0 max-w-xs mx-auto h-44 blur-[100px]" 
            style={{ 
              background: "radial-gradient(circle, rgba(192,132,252,0.3) 20%, rgba(232,121,249,0.2) 50%, rgba(192,132,252,0.1) 80%)"
            }}
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="relative mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="transition-all duration-300"
              >
                <Card className="h-full bg-pink-100 border-gray-100 hover:border-purple-200">
                  <CardHeader className="pb-2">
                    <motion.div 
                      className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-50 text-purple-600 mb-2"
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <CardTitle className="text-lg text-gray-800 font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseSection;