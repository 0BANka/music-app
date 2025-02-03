import { albumsReducer } from '@/features/albumsSlice';
import { artistsReducer } from '@/features/artistsSlice';
import { entitiesReducer } from '@/features/entitiesSlice';
import { tracksHistoryReducer } from '@/features/tracksHistorySlice';
import { tracksReducer } from '@/features/tracksSlice';
import { userReducer } from '@/features/userSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  tracksHistory: tracksHistoryReducer,
  user: userReducer,
  entities: entitiesReducer,
});
