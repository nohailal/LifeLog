import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export function Card({ children, className, animateIn = false }) {
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

export function Button({ children, onClick, className, icon, animated = false }) {
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

export function Switch({ checked, onCheckedChange, label }) {
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

export function Textarea({ value, onChange, placeholder, className }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-300 ${className}`}
    />
  );
}

export function BlogTip({ icon, title, content, isActive }) {
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

export function PostCard({ children, isPrivate, type, index }) {
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

export function TabButton({ icon, label, isActive, onClick }) {
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