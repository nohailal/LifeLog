import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  posts: [
    {
      id: 1,
      caption: "Morning meditation helps clear my mind and set the tone for the day. ☀️ #Mindfulness #HealthJournal",
      likes: 120,
      comments: [
        { username: "fit_life", text: "Absolutely agree!" },
        { username: "yoga_lover", text: "Meditation changed my life." }
      ],
      mood: "😊",
      timestamp: "Today at 8:45 AM"
    }
  ],
  likedPosts: {},
  newPost: { caption: "", mood: "😊" },
  showComments: {},
  isExpanded: false,
  highlightedPost: null,
  ui: {
    animateIn: false,
    activeTab: "journal"
  }
};

const healthJournalSlice = createSlice({
  name: 'healthJournal',
  initialState,
  reducers: {
    setAnimateIn: (state, action) => {
      state.ui.animateIn = action.payload;
    },
    toggleLike: (state, action) => {
      const postId = action.payload;
      state.likedPosts[postId] = !state.likedPosts[postId];
    },
    highlightPost: (state, action) => {
      state.highlightedPost = action.payload;
    },
    resetHighlight: (state) => {
      state.highlightedPost = null;
    },
    toggleComments: (state, action) => {
      const postId = action.payload;
      state.showComments[postId] = !state.showComments[postId];
    },
    setNewPostCaption: (state, action) => {
      state.newPost.caption = action.payload;
    },
    setNewPostMood: (state, action) => {
      state.newPost.mood = action.payload;
    },
    resetNewPost: (state) => {
      state.newPost = { caption: "", mood: "😊" };
    },
    toggleExpanded: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    setExpanded: (state, action) => {
      state.isExpanded = action.payload;
    },
    addPost: (state) => {
      if (state.newPost.caption) {
        const now = new Date();
        const timeString = `Today at ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
        
        const newPostObj = { 
          id: Date.now(), 
          caption: state.newPost.caption,
          mood: state.newPost.mood,
          likes: 0, 
          comments: [],
          timestamp: timeString,
          isNew: true
        };
        
        state.posts.unshift(newPostObj);
        state.newPost = { caption: "", mood: "😊" };
        state.isExpanded = false;
      }
    },
    markPostAsOld: (state, action) => {
      const postId = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].isNew = false;
      }
    },
    addComment: (state, action) => {
      const { postId, text } = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === postId);
      if (postIndex !== -1 && text.trim()) {
        state.posts[postIndex].comments.push({
          username: "you",
          text: text
        });
      }
    },
    setActiveTab: (state, action) => {
      state.ui.activeTab = action.payload;
    }
  }
});

// Export actions
export const { 
  setAnimateIn,
  toggleLike,
  highlightPost,
  resetHighlight,
  toggleComments,
  setNewPostCaption,
  setNewPostMood,
  resetNewPost,
  toggleExpanded,
  setExpanded,
  addPost,
  markPostAsOld,
  addComment,
  setActiveTab
} = healthJournalSlice.actions;

// Selectors
export const selectPosts = (state) => state.healthJournal.posts;
export const selectLikedPosts = (state) => state.healthJournal.likedPosts;
export const selectNewPost = (state) => state.healthJournal.newPost;
export const selectShowComments = (state) => state.healthJournal.showComments;
export const selectIsExpanded = (state) => state.healthJournal.isExpanded;
export const selectHighlightedPost = (state) => state.healthJournal.highlightedPost;
export const selectAnimateIn = (state) => state.healthJournal.ui.animateIn;
export const selectActiveTab = (state) => state.healthJournal.ui.activeTab;

// Export reducer
export default healthJournalSlice.reducer;