import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  ArrowLeft, 
  Lightbulb, 
  Coffee, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Award
} from "lucide-react";

// Import UI components
import { Button, BlogTip } from "./ui/BlogUIComponents";

// Import actions and selectors
import { 
  selectSidebarCollapsed, 
  selectCurrentTip,
  toggleSidebar,
  setCurrentTip
} from "@/slices/blogSlice";

// Blog tips data
const blogTips = [
  {
    icon: <Lightbulb size={18} />,
    title: "Be Consistent",
    content: "Regular posting keeps your audience engaged. Try to establish a consistent schedule."
  },
  {
    icon: <Coffee size={18} />,
    title: "Take Breaks",
    content: "Quality over quantity. It's okay to take breaks to avoid burnout and maintain quality."
  },
  {
    icon: <BookOpen size={18} />,
    title: "Read Others",
    content: "Reading other blogs in your niche helps you stay inspired and informed."
  },
  {
    icon: <TrendingUp size={18} />,
    title: "Track Analytics",
    content: "Use analytics to understand what content resonates with your audience."
  },
  {
    icon: <Calendar size={18} />,
    title: "Plan Ahead",
    content: "Create a content calendar to stay organized and maintain a consistent posting schedule."
  },
  {
    icon: <Award size={18} />,
    title: "Quality Matters",
    content: "Focus on creating valuable, high-quality content that solves problems for your readers."
  }
];

const BlogSidebar = ({ onReturnHome }) => {
  const dispatch = useDispatch();
  const sidebarCollapsed = useSelector(selectSidebarCollapsed);
  const currentTip = useSelector(selectCurrentTip);

  return (
    <div 
      className={`bg-pink-100 p-6 shadow-lg transition-all duration-500 ease-in-out ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      } flex flex-col`}
    >
      <div className={`text-center mb-8 transition-all duration-500 ${sidebarCollapsed ? 'opacity-0 h-0 mb-0' : 'opacity-100'}`}>
        <h2 className="text-2xl font-bold text-pink-700">My Blog</h2>
        <div className="mt-1 h-1 mx-auto w-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"></div>
      </div>
      
      <div className={`transition-all duration-500 ${sidebarCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <h3 className="text-pink-700 uppercase text-xs font-semibold tracking-wider mb-3">Blog Advice</h3>
        <div className="space-y-3">
          {/* Display current tip with animation */}
          <div className="relative h-28 overflow-hidden rounded-lg">
            {blogTips.map((tip, index) => (
              <div 
                key={index} 
                className="absolute inset-0"
              >
                <BlogTip 
                  icon={tip.icon} 
                  title={tip.title} 
                  content={tip.content}
                  isActive={index === currentTip}
                />
              </div>
            ))}
          </div>
          
          {/* Tip navigation dots */}
          <div className="flex justify-center space-x-1">
            {blogTips.map((_, index) => (
              <div 
                key={index}
                onClick={() => dispatch(setCurrentTip(index))}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentTip ? 'bg-gradient-to-r from-pink-400 to-pink-500 w-6' : 'bg-pink-200 hover:bg-pink-300 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Toggle sidebar button */}
      <div 
        className="absolute top-1/2 -right-3 w-6 h-12 bg-pink-200 rounded-r-md flex items-center justify-center cursor-pointer shadow-md"
        onClick={() => dispatch(toggleSidebar())}
      >
        <div className={`w-2 h-4 flex flex-col justify-between transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`}>
          <div className="w-0.5 h-1 bg-pink-500 rounded-full transform translate-x-0.5"></div>
          <div className="w-0.5 h-1 bg-pink-500 rounded-full transform translate-x-0.5"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;