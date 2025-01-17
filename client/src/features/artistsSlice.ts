import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IArtist } from '@/interfaces/IArtist';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  artists: IArtist[];
  selectedArtist: IArtist;
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  artists: [],
  selectedArtist: {
    id: '',
    name: '',
    photo: '',
  },
};

export const fetchArtists = createAsyncThunk('fetch/artists', async () => {
  const { data } = await axiosApiClient.get<IArtist[]>('/artists');
  return data;
});

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    clearSelectedArtist: (state) => {
      state.selectedArtist = {
        id: '',
        name: '',
        photo: '',
      };
    },
  },
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
export const { clearSelectedArtist } = artistsSlice.actions;
