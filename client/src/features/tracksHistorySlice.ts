import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { ITrackHistory } from '@/interfaces/ITrackHistory';

interface State {
  tracks: ITrackHistory[];
  error?: Error;
  loading: boolean;
}

export interface HistoryTrackRequest {
  track: string;
}

const initialState: State = {
  loading: false,
  tracks: [],
};

export const addTrackHistory = createAsyncThunk(
  'track/addHistory',
  async (track: string) => {
    const { data } = await axiosApiClient.post(`/track_history`, {
      track: String(track),
    });
    return data;
  },
);

export const fetchTracksHistory = createAsyncThunk(
  'track/fetchHistory',
  async () => {
    const { data } = await axiosApiClient.get<ITrackHistory[]>(
      `/track_history`,
    );
    return data;
  },
);

const tracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracksHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTracksHistory.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.loading = false;
      });
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;
