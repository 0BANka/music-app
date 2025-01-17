import { commentsReducer } from '@/features/commentsSlice';
import { postsReducer } from '@/features/postsSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
