import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Book, 
  Lightbulb, 
  Coffee, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Award,
  Quote,
  ChevronLeft,
  ChevronRight
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

// Fallback quotes in case the API fails
const fallbackQuotes = [
  { text: "Write only if you cannot live without writing.", author: "Elie Wiesel" },
  { text: "The scariest moment is always just before you start.", author: "Stephen King" },
  { text: "You can make anything by writing.", author: "C.S. Lewis" },
  { text: "A professional writer is an amateur who didn't quit.", author: "Richard Bach" },
  { text: "Start writing, no matter what. The water does not flow until the faucet is turned on.", author: "Louis L'Amour" },
  { text: "The first draft of anything is garbage.", author: "Ernest Hemingway" },
  { text: "You don't start out writing good stuff. You start out writing crap and thinking it's good stuff.", author: "Octavia E. Butler" }
];

const BlogSidebar = ({ onReturnHome }) => {
  const dispatch = useDispatch();
  const sidebarCollapsed = useSelector(selectSidebarCollapsed);
  const currentTip = useSelector(selectCurrentTip);
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [isLoadingQuote, setIsLoadingQuote] = useState(true);
  const [useFallbackQuotes, setUseFallbackQuotes] = useState(false);

  // Function to get a random fallback quote
  const getRandomFallbackQuote = () => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  };

  // Added missing getNewQuote function
  const getNewQuote = () => {
    if (useFallbackQuotes) {
      setQuote(getRandomFallbackQuote());
    } else {
      fetchQuote();
    }
  };

  // Extracted fetchQuote function to be reusable
  const fetchQuote = async () => {
    if (useFallbackQuotes) {
      setQuote(getRandomFallbackQuote());
      setIsLoadingQuote(false);
      return;
    }

    setIsLoadingQuote(true);
    try {
      // Use quotable.io instead of zenquotes.io
      const response = await fetch("https://api.quotable.io/random");
      
      if (!response.ok) {
        throw new Error(`API response error: ${response.status}`);
      }
      
      const data = await response.json();
      
      setQuote({
        text: data.content,
        author: data.author
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setUseFallbackQuotes(true);
      setQuote(getRandomFallbackQuote());
    } finally {
      setIsLoadingQuote(false);
    }
  };

  // Fetch a quote from API with better error handling
  useEffect(() => {
    if (!sidebarCollapsed) {
      fetchQuote();
    }
  }, [sidebarCollapsed, useFallbackQuotes]);

  // Removed unused function
  // const handleToggleSidebar = () => {
  //   dispatch(toggleSidebar());
  // };

  return (
    <div 
      className={`bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg transition-all duration-500 ease-in-out flex flex-col relative ${
        sidebarCollapsed ? 'w-20' : 'w-80'
      }`}
    >
      {/* Decorative top element */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      
      <div className="p-6">
        <div className={`flex items-center justify-center transition-all duration-500 mb-8 ${sidebarCollapsed ? 'opacity-0 h-0 mb-0 overflow-hidden' : 'opacity-100'}`}>
          <Book className="text-blue-600 mr-2" size={22} />
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">Blogger Pro</h2>
        </div>
        
        <div className={`transition-all duration-500 ${sidebarCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          {/* Blog Tips Section */}
          <div className="mb-8">
            <h3 className="text-blue-700 uppercase text-xs font-semibold tracking-wider mb-4 flex items-center">
              <Lightbulb size={14} className="mr-2 text-blue-500" /> 
              <span>Writing Tips</span>
            </h3>
            
            {/* Tips card with subtle shadow and rounded corners */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-blue-100">
              <div className="relative h-32 overflow-hidden">
                {blogTips.map((tip, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 p-4 transition-opacity duration-300 ${
                      index === currentTip ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                        {tip.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-1">{tip.title}</h4>
                        <p className="text-sm text-gray-600">{tip.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Improved navigation controls */}
              <div className="flex items-center justify-between px-4 py-2 bg-blue-50 border-t border-blue-100">
                <button 
                  onClick={() => dispatch(setCurrentTip((currentTip - 1 + blogTips.length) % blogTips.length))}
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <div className="flex space-x-1">
                  {blogTips.map((_, index) => (
                    <div 
                      key={index}
                      onClick={() => dispatch(setCurrentTip(index))}
                      className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                        index === currentTip ? 'bg-blue-500 w-4' : 'bg-blue-200 hover:bg-blue-300 w-1.5'
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => dispatch(setCurrentTip((currentTip + 1) % blogTips.length))}
                  className="p-1 rounded-full text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Quotes Section */}
          <div>
            <h3 className="text-blue-700 uppercase text-xs font-semibold tracking-wider mb-4 flex items-center">
              <Quote size={14} className="mr-2 text-blue-500" /> 
              <span>Daily Inspiration</span>
            </h3>
            
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
              <div className="p-4">
                {isLoadingQuote ? (
                  <div className="flex items-center justify-center h-24">
                    <div className="w-6 h-6 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 italic text-sm leading-relaxed mb-3">"{quote.text}"</p>
                    <div className="flex items-center justify-between">
                      <p className="text-blue-700 text-xs font-medium">— {quote.author}</p>
                      <button 
                        onClick={getNewQuote} 
                        disabled={isLoadingQuote}
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center focus:outline-none"
                      >
                        <Quote size={12} className="mr-1" />
                        <span>New Quote</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Improved toggle sidebar button with smooth animation */}
      <div 
        className="absolute top-1/2 -right-4 w-8 h-16 bg-white rounded-r-lg flex items-center justify-center cursor-pointer shadow-md transform -translate-y-1/2 border-r border-t border-b border-blue-100"
        onClick={() => dispatch(toggleSidebar())}
      >
        <div className="text-blue-600 transition-transform duration-300">
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </div>
      </div>
      
      {/* Decorative subtle pattern */}
      <div className="absolute bottom-0 left-0 w-full h-24 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="none"/>
            <path d="M 0,10 l 20,0 M 10,0 l 0,20" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default BlogSidebar;
