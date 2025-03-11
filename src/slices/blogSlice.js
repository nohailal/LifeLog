import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  posts: {
    text: [],
    image: [],
    music: []
  },
  ui: {
    activeTab: "text",
    currentTip: 0,
    sidebarCollapsed: false,
    isPrivate: false
  },
  newPost: {
    content: ""
  }
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.ui.activeTab = action.payload;
    },
    setCurrentTip: (state, action) => {
      state.ui.currentTip = action.payload;
    },
    incrementTip: (state) => {
      state.ui.currentTip = (state.ui.currentTip + 1) % 6; // 6 is the total number of tips
    },
    toggleSidebar: (state) => {
      state.ui.sidebarCollapsed = !state.ui.sidebarCollapsed;
    },
    togglePrivate: (state) => {
      state.ui.isPrivate = !state.ui.isPrivate;
    },
    setNewPostContent: (state, action) => {
      state.newPost.content = action.payload;
    },
    addTextPost: (state) => {
      if (!state.newPost.content.trim()) return;
      
      state.posts.text.unshift({
        content: state.newPost.content,
        isPrivate: state.ui.isPrivate,
        timestamp: new Date().toISOString()
      });
      
      state.newPost.content = "";
    },
    addImagePost: (state, action) => {
      state.posts.image.unshift({
        image: action.payload,
        isPrivate: state.ui.isPrivate,
        timestamp: new Date().toISOString()
      });
    },
    addMusicPost: (state, action) => {
      state.posts.music.unshift({
        music: action.payload,
        isPrivate: state.ui.isPrivate,
        timestamp: new Date().toISOString()
      });
    }
  }
});

// Export actions
export const {
  setActiveTab,
  setCurrentTip,
  incrementTip,
  toggleSidebar,
  togglePrivate,
  setNewPostContent,
  addTextPost,
  addImagePost,
  addMusicPost
} = blogSlice.actions;

// Selectors
export const selectActiveTab = (state) => state.blog.ui.activeTab;
export const selectCurrentTip = (state) => state.blog.ui.currentTip;
export const selectSidebarCollapsed = (state) => state.blog.ui.sidebarCollapsed;
export const selectIsPrivate = (state) => state.blog.ui.isPrivate;
export const selectNewPostContent = (state) => state.blog.newPost.content;
export const selectTextPosts = (state) => state.blog.posts.text;
export const selectImagePosts = (state) => state.blog.posts.image;
export const selectMusicPosts = (state) => state.blog.posts.music;

// Combined selector for all posts
export const selectAllPosts = (state) => {
  const textPosts = state.blog.posts.text.map(post => ({ ...post, type: 'text' }));
  const imagePosts = state.blog.posts.image.map(post => ({ ...post, type: 'image' }));
  const musicPosts = state.blog.posts.music.map(post => ({ ...post, type: 'music' }));
  
  return [...textPosts, ...imagePosts, ...musicPosts]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export default blogSlice.reducer;