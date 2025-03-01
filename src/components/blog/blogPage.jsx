import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Home, User, Settings, Image, Music, PenTool, ArrowLeft, Lightbulb, Coffee, BookOpen, Calendar, Award, TrendingUp } from "lucide-react";

// Reusable components with enhanced styling
function Card({ children, className, animateIn = false }) {
  const [isVisible, setIsVisible] = useState(!animateIn);
  const cardRef = useRef(null);

  useEffect(() => {
    if (animateIn && cardRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(cardRef.current);
      return () => observer.disconnect();
    }
  }, [animateIn]);

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Button({ children, onClick, className, icon, animated = false }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-300 
        ${animated ? 'hover:scale-105 active:scale-95' : ''} ${className}`}
    >
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

function Switch({ checked, onCheckedChange, label }) {
  return (
    <div className="flex items-center gap-2 group">
      <div 
        onClick={onCheckedChange}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <div 
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${checked ? 'left-7' : 'left-1'}`} 
        />
      </div>
      <span className="text-sm font-medium transition-colors duration-200 group-hover:text-blue-700">{label}</span>
    </div>
  );
}

function Textarea({ value, onChange, placeholder, className }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-300 ${className}`}
    />
  );
}

function BlogTip({ icon, title, content, isActive }) {
  return (
    <div className={`bg-pink-100 rounded-lg p-4 text-gray-800 transition-all duration-500
      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-pink-600 animate-pulse">{icon}</div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
}

function PostCard({ children, isPrivate, type, index }) {
  const borderColors = {
    text: "border-blue-500",
    image: "border-pink-500",
    music: "border-purple-500"
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`p-4 bg-white text-gray-800 shadow-md rounded-lg relative border-l-4 ${borderColors[type]} 
        transform transition-all duration-500 
        animate-fadeIn opacity-0 
        ${isHovered ? 'shadow-xl scale-[1.02]' : ''}`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div className="absolute top-3 right-3">
        {isPrivate ? (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <EyeOff size={16} className={`transition-all duration-300 ${isHovered ? 'rotate-12' : ''}`} />
            <span>Private</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs text-blue-500">
            <Eye size={16} className={`transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
            <span>Public</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ icon, label, isActive, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center px-4 py-3 cursor-pointer transition-all duration-300 relative group
        ${isActive ? "text-blue-700 font-medium" : "text-gray-500 hover:text-blue-500"}`}
    >
      <span className="mr-2 transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span>{label}</span>
      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 transform transition-transform duration-300" />
      )}
    </div>
  );
}

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("text");
  const [textPosts, setTextPosts] = useState([]);
  const [imagePosts, setImagePosts] = useState([]);
  const [musicPosts, setMusicPosts] = useState([]);
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const imageInputRef = useRef(null);
  const musicInputRef = useRef(null);

  // Add keyframe animations to CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.6s ease-out forwards;
      }
      
      .animate-slideIn {
        animation: slideIn 0.5s ease-out forwards;
      }
      
      .animate-pulse-subtle {
        animation: pulse 3s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  // Rotate blog tips every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % blogTips.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [blogTips.length]);

  const handleTextPost = () => {
    if (!content.trim()) return;
    setTextPosts([{ content, isPrivate, timestamp: new Date() }, ...textPosts]);
    setContent("");
  };

  const handleImagePost = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePosts([{ image: URL.createObjectURL(file), isPrivate, timestamp: new Date() }, ...imagePosts]);
    e.target.value = null; // Reset input
  };

  const handleMusicPost = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMusicPosts([{ music: URL.createObjectURL(file), isPrivate, timestamp: new Date() }, ...musicPosts]);
    e.target.value = null; // Reset input
  };

  const allPosts = [
    ...textPosts.map(post => ({ ...post, type: 'text' })),
    ...imagePosts.map(post => ({ ...post, type: 'image' })),
    ...musicPosts.map(post => ({ ...post, type: 'music' }))
  ].sort((a, b) => b.timestamp - a.timestamp);

  const handleReturnHome = () => {
    // In a real app, this would navigate back to the home page
    alert("Returning to home page");
  };

  return (
    <div className="flex min-h-screen bg-blue-100 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`bg-pink-100 p-6 shadow-lg transition-all duration-500 ease-in-out ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        } flex flex-col`}
      >
        <div className={`text-center mb-8 transition-all duration-500 ${sidebarCollapsed ? 'opacity-0 h-0 mb-0' : 'opacity-100'}`}>
          <h2 className="text-2xl font-bold text-pink-700">My Blog</h2>
          <div className="mt-1 h-1 mx-auto w-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"></div>
        </div>
        
        <Button
          onClick={handleReturnHome}
          className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md mb-6 ${
            sidebarCollapsed ? 'p-2 justify-center' : ''
          }`}
          icon={<ArrowLeft size={16} />}
          animated={true}
        >
          {!sidebarCollapsed && "Return Home"}
        </Button>
        
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
                  onClick={() => setCurrentTip(index)}
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
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <div className={`w-2 h-4 flex flex-col justify-between transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`}>
            <div className="w-0.5 h-1 bg-pink-500 rounded-full transform translate-x-0.5"></div>
            <div className="w-0.5 h-1 bg-pink-500 rounded-full transform translate-x-0.5"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center text-blue-800 animate-slideIn opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <h1 className="text-4xl font-bold tracking-tight">
              My Creative Space
            </h1>
            <p className="mt-2 text-blue-600">Share your thoughts, images, and music with the world.</p>
          </div>

          {/* Post Creator */}
          <Card className="p-6 overflow-hidden" animateIn={true}>
            {/* Tabs */}
            <div className="flex border-b mb-4">
              <TabButton 
                icon={<PenTool size={18} />} 
                label="Text" 
                isActive={activeTab === "text"}
                onClick={() => setActiveTab("text")}
              />
              <TabButton 
                icon={<Image size={18} />} 
                label="Image" 
                isActive={activeTab === "image"}
                onClick={() => setActiveTab("image")}
              />
              <TabButton 
                icon={<Music size={18} />} 
                label="Music" 
                isActive={activeTab === "music"}
                onClick={() => setActiveTab("music")}
              />
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-500">
              {activeTab === "text" && (
                <div className="space-y-4 animate-fadeIn opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-32"
                  />
                  <div className="flex justify-between items-center">
                    <Switch
                      checked={isPrivate}
                      onCheckedChange={() => setIsPrivate(!isPrivate)}
                      label="Private post"
                    />
                    <Button
                      onClick={handleTextPost}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
                      icon={<PenTool size={16} />}
                      animated={true}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "image" && (
                <div className="space-y-4 animate-fadeIn opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                  <div 
                    onClick={() => imageInputRef.current.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-all duration-300 group"
                  >
                    <Image size={32} className="mx-auto text-gray-400 transition-transform duration-300 group-hover:scale-110" />
                    <p className="mt-2 text-gray-500 group-hover:text-blue-600 transition-colors duration-300">Click to upload an image</p>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImagePost}
                      className="hidden"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Switch
                      checked={isPrivate}
                      onCheckedChange={() => setIsPrivate(!isPrivate)}
                      label="Private image"
                    />
                  </div>
                </div>
              )}

              {activeTab === "music" && (
                <div className="space-y-4 animate-fadeIn opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                  <div 
                    onClick={() => musicInputRef.current.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-all duration-300 group"
                  >
                    <Music size={32} className="mx-auto text-gray-400 transition-transform duration-300 group-hover:scale-110" />
                    <p className="mt-2 text-gray-500 group-hover:text-blue-600 transition-colors duration-300">Click to upload music</p>
                    <input
                      ref={musicInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleMusicPost}
                      className="hidden"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <Switch
                      checked={isPrivate}
                      onCheckedChange={() => setIsPrivate(!isPrivate)}
                      label="Private audio"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-blue-800 animate-slideIn opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Your Feed
            </h2>
            
            {allPosts.length === 0 && (
              <Card className="p-8 text-center text-gray-500 animate-fadeIn opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                <p>No posts yet. Create your first post above!</p>
              </Card>
            )}
            
            <div className="grid gap-4">
              {allPosts.map((post, index) => (
                <PostCard key={index} isPrivate={post.isPrivate} type={post.type} index={index}>
                  {post.type === 'text' && <p className="text-gray-800">{post.content}</p>}
                  {post.type === 'image' && (
                    <img 
                      src={post.image} 
                      alt="Uploaded" 
                      className="w-full rounded-lg object-cover transition-all duration-700 hover:scale-[1.02]" 
                    />
                  )}
                  {post.type === 'music' && (
                    <audio controls src={post.music} className="w-full mt-2" />
                  )}
                </PostCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}