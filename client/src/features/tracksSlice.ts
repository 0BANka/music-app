import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { ITrack } from '@/interfaces/ITrack';

interface State {
  tracks: ITrack[];
  error?: Error;
  loading: boolean;
}

export interface HistoryTrack {
  user: string;
  track: string;
  datetime: string;
}

const initialState: State = {
  loading: false,
  tracks: [],
};

export interface HistoryTrackRequest {
  track: string;
  token: string;
}

export const addTrackHistory = createAsyncThunk(
  'track/addHistory',
  async (trackRequest: HistoryTrackRequest) => {
    const { data } = await axiosApiClient.post<HistoryTrack>(
      `/track_history`,
      {
        track: String(trackRequest.track),
      },
      { headers: { Authorization: `${trackRequest.token}` } },
    );
    return data;
  },
);

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
