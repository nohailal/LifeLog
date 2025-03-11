import React from "react";
import { Card, PostCard } from "./ui/BlogUIComponents";

const PostsFeed = ({ posts }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-blue-800 animate-slideIn opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
        Your Feed
      </h2>
      
      {posts.length === 0 && (
        <Card className="p-8 text-center text-gray-500 animate-fadeIn opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <p>No posts yet. Create your first post above!</p>
        </Card>
      )}
      
      <div className="grid gap-4">
        {posts.map((post, index) => (
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
  );
};

export default PostsFeed;