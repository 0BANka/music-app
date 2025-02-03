import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { ITrack } from '@/interfaces/ITrack';
import { AxiosError } from 'axios';

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

export const deleteTrack = createAsyncThunk(
  'delete/track',
  async (trackId: string) => {
    const { data } = await axiosApiClient.delete(`/tracks/${trackId}`);
    return data;
  },
);

export const publishTrack = createAsyncThunk(
  'publish/track',
  async (trackId: string) => {
    const { data } = await axiosApiClient.post(`/tracks/${trackId}/publish`);
    return data;
  },
);

export const createTrack = createAsyncThunk(
  'create/track',
  async (payload: FormData) => {
    try {
      const { data } = await axiosApiClient.post('/tracks', payload);
      return data;
    } catch (e) {
      const error = e as AxiosError<{ error: string; message: [string] }>;
      if (error.response?.data?.error) {
        return error.response.data.message;
      }
    }
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
      })
      .addCase(createTrack.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTrack.fulfilled, (state, action) => {
        state.tracks = [...state.tracks, action.payload];
        state.loading = false;
      })
      .addCase(deleteTrack.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTrack.fulfilled, (state, action) => {
        state.tracks = state.tracks.filter(
          (track) => track.id !== action.payload.id,
        );
      })
      .addCase(publishTrack.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishTrack.fulfilled, (state, action) => {
        state.tracks = state.tracks.map((track) => {
          if (track.id === action.payload.id) {
            return {
              ...track,
              isPublish: true,
            };
          }
          return track;
        });
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
export const { setYoutubeModal } = tracksSlice.actions;
