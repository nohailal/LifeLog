import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import components
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogContent from "@/components/blog/BlogContent";

// Import animations
import { setupAnimations } from "@/utils/animations";

// Import actions
import { incrementTip } from "@/slices/blogSlice";

export default function BlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Set up CSS animations on component mount
  useEffect(() => {
    const cleanup = setupAnimations();
    return cleanup;
  }, []);
  
  // Rotate blog tips every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementTip());
    }, 8000);
    
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleReturnHome = () => navigate("/");

  return (
    <div className="flex min-h-screen bg-blue-100 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <BlogSidebar onReturnHome={handleReturnHome} />

      {/* Main Content */}
      <BlogContent />
    </div>
  );
}