import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PenTool, Image, Music, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { selectAllPosts } from "@/slices/blogSlice";

const BlogWidget = () => {
  const navigate = useNavigate();
  const posts = useSelector(selectAllPosts);
  
  // Get the latest post
  const latestPost = posts.length > 0 ? posts[0] : null;
  
  // Count posts by type
  const textPostsCount = posts.filter(post => post.type === 'text').length;
  const imagePostsCount = posts.filter(post => post.type === 'image').length;
  const musicPostsCount = posts.filter(post => post.type === 'music').length;
  
  const handleNavigateToBlog = () => {
    navigate("/blog");
  };
  
  // Get the appropriate icon for the post type
  const getPostIcon = (type) => {
    switch (type) {
      case 'text':
        return <PenTool className="h-4 w-4" />;
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'music':
        return <Music className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Get the appropriate color class for the post type
  const getTypeColorClass = (type) => {
    switch (type) {
      case 'text':
        return "bg-blue-100 text-blue-600";
      case 'image':
        return "bg-pink-100 text-pink-600";
      case 'music':
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-semibold">My Blog</CardTitle>
          <Badge variant="outline" className="font-normal">
            {posts.length} posts
          </Badge>
        </CardHeader>
        
        <CardContent className="p-4">
          {latestPost ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge 
                  variant="outline" 
                  className={`flex items-center gap-1 ${getTypeColorClass(latestPost.type)}`}
                >
                  {getPostIcon(latestPost.type)}
                  <span className="capitalize">{latestPost.type}</span>
                </Badge>
                
                <span className="text-xs text-gray-500">
                  {new Date(latestPost.timestamp).toLocaleDateString()}
                </span>
              </div>
              
              {latestPost.type === 'text' && (
                <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                  {latestPost.content}
                </p>
              )}
              
              {latestPost.type === 'image' && (
                <div className="mb-3 rounded-md overflow-hidden">
                  <img 
                    src={latestPost.image} 
                    alt="Latest post" 
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
              
              {latestPost.type === 'music' && (
                <div className="mb-3">
                  <div className="bg-gray-100 p-3 rounded-md flex items-center justify-center">
                    <Music className="text-gray-600" />
                    <span className="ml-2 text-sm text-gray-600">Audio file</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex space-x-3">
                  <span className="flex items-center">
                    <PenTool className="h-3 w-3 mr-1" />
                    {textPostsCount}
                  </span>
                  <span className="flex items-center">
                    <Image className="h-3 w-3 mr-1" />
                    {imagePostsCount}
                  </span>
                  <span className="flex items-center">
                    <Music className="h-3 w-3 mr-1" />
                    {musicPostsCount}
                  </span>
                </div>
                <span>{latestPost.isPrivate ? 'Private' : 'Public'}</span>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center">
              <p className="text-sm text-gray-600 mb-2">No blog posts yet</p>
            </div>
          )}
          
          <button
            onClick={handleNavigateToBlog}
            className="w-full mt-3 flex justify-center items-center py-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            Go to Blog
            <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogWidget;