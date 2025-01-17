import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { ITrack } from '@/interfaces/ITrack';

interface State {
  tracks: ITrack[];
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  tracks: [],
};

export const fetchTracks = createAsyncThunk(
  'fetch/tracks',
  async (albumId: string) => {
    const { data } = await axiosApiClient.get<ITrack[]>(
      `/tracks?album=${albumId}`,
    );
    return data;
  },
);

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.loading = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
