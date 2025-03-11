import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PenTool, Image, Music } from "lucide-react";

import { Card, TabButton, Textarea, Switch, Button } from "./ui/BlogUIComponents";

import {
  selectActiveTab,
  selectIsPrivate,
  selectNewPostContent,
  setActiveTab,
  togglePrivate,
  setNewPostContent,
  addTextPost,
  addImagePost,
  addMusicPost
} from "@/slices/blogSlice";

const PostCreator = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);
  const isPrivate = useSelector(selectIsPrivate);
  const content = useSelector(selectNewPostContent);
  
  // Refs for file inputs
  const imageInputRef = useRef(null);
  const musicInputRef = useRef(null);

  // Handle image upload
  const handleImagePost = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create object URL for the image
    const imageUrl = URL.createObjectURL(file);
    dispatch(addImagePost(imageUrl));
    
    // Reset file input
    e.target.value = null;
  };

  // Handle music upload
  const handleMusicPost = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create object URL for the music
    const musicUrl = URL.createObjectURL(file);
    dispatch(addMusicPost(musicUrl));
    
    // Reset file input
    e.target.value = null;
  };

  return (
    <Card className="p-6 overflow-hidden" animateIn={true}>
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <TabButton 
          icon={<PenTool size={18} />} 
          label="Text" 
          isActive={activeTab === "text"}
          onClick={() => dispatch(setActiveTab("text"))}
        />
        <TabButton 
          icon={<Image size={18} />} 
          label="Image" 
          isActive={activeTab === "image"}
          onClick={() => dispatch(setActiveTab("image"))}
        />
        <TabButton 
          icon={<Music size={18} />} 
          label="Music" 
          isActive={activeTab === "music"}
          onClick={() => dispatch(setActiveTab("music"))}
        />
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-500">
        {activeTab === "text" && (
          <div className="space-y-4 animate-fadeIn opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => dispatch(setNewPostContent(e.target.value))}
              className="min-h-32"
            />
            <div className="flex justify-between items-center">
              <Switch
                checked={isPrivate}
                onCheckedChange={() => dispatch(togglePrivate())}
                label="Private post"
              />
              <Button
                onClick={() => dispatch(addTextPost())}
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
                onCheckedChange={() => dispatch(togglePrivate())}
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
                onCheckedChange={() => dispatch(togglePrivate())}
                label="Private audio"
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCreator;