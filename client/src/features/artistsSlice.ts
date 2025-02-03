import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
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

export const createArtist = createAsyncThunk(
  'create/artist',
  async (payload: FormData) => {
    try {
      const { data } = await axiosApiClient.post('/artists', payload);
      return data;
    } catch (e) {
      const error = e as AxiosError<{ error: string; message: [string] }>;
      if (error.response?.data?.error) {
        return error.response.data.message;
      }
    }
  },
);

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
      })
      .addCase(createArtist.pending, (state) => {
        state.loading = true;
      })
      .addCase(createArtist.fulfilled, (state, action) => {
        state.artists = [...state.artists, action.payload];
        state.loading = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
