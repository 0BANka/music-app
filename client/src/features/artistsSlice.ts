import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IArtist } from '@/interfaces/IArtist';

interface State {
  artists: IArtist[];
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  artists: [],
};

export const fetchArtists = createAsyncThunk('fetch/artists', async () => {
  const { data } = await axiosApiClient.get<IArtist[]>('/artists');
  return data;
});

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.loading = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
