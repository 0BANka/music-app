import { configureStore } from '@reduxjs/toolkit';
import { albumsReducer } from '@/features/albumsSlice';
import { artistsReducer } from '@/features/artistsSlice';
import { tracksReducer } from '@/features/tracksSlice';
import { userReducer } from '../features/userSlice';

const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
