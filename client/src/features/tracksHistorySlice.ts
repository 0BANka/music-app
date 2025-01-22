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
  token: string;
}

const initialState: State = {
  loading: false,
  tracks: [],
};

export const addTrackHistory = createAsyncThunk(
  'track/addHistory',
  async (trackRequest: HistoryTrackRequest) => {
    const { data } = await axiosApiClient.post(
      `/track_history`,
      {
        track: String(trackRequest.track),
      },
      { headers: { Authorization: `${trackRequest.token}` } },
    );
    return data;
  },
);

export const fetchTracksHistory = createAsyncThunk(
  'track/fetchHistory',
  async (token: string) => {
    const { data } = await axiosApiClient.get<ITrackHistory[]>(
      `/track_history`,
      { headers: { Authorization: `${token}` } },
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
