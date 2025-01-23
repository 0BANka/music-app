import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { ITrack } from '@/interfaces/ITrack';

interface State {
  tracks: ITrack[];
  youtubeModal: boolean;
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  youtubeModal: false,
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
  reducers: {
    setYoutubeModal: (state, action) => {
      state.youtubeModal = action.payload;
    },
  },
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
export const { setYoutubeModal } = tracksSlice.actions;
