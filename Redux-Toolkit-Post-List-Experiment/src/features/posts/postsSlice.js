import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: []
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    // Add a new post
    addPost: (state, action) => {
      state.posts.push({
        id: Date.now(),
        text: action.payload,
        liked: false,
        createdAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      });
    },

    // Delete a post
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    // Edit a post
    editPost: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload.id
      );

      if (post) {
        post.text = action.payload.text;
      }
    },

    // Like / Unlike a post
    toggleLike: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload
      );

      if (post) {
        post.liked = !post.liked;
      }
    },

    // Delete all posts
    clearPosts: (state) => {
      state.posts = [];
    }
  }
});

export const {
  addPost,
  deletePost,
  editPost,
  toggleLike,
  clearPosts
} = postsSlice.actions;

export default postsSlice.reducer;