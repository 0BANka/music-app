import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IArtist } from '@/interfaces/IArtist';

interface State {
  artists: IArtist[];
  error?: Error;
  artistsLoading: boolean;
}

const initialState: State = {
  artistsLoading: false,
  artists: [],
};

export const fetchArtists = createAsyncThunk('fetch/artists', async () => {
  const { data } = await axiosApiClient.get<IArtist[]>('/artists');
  return data;
});

export const deleteArtist = createAsyncThunk(
  'delete/artist',
  async (artistId: string) => {
    const { data } = await axiosApiClient.delete(`/artists/${artistId}`);
    return data;
  },
);

export const publishArtist = createAsyncThunk(
  'publish/artist',
  async (artistId: string) => {
    const { data } = await axiosApiClient.post(`/artists/${artistId}/publish`);
    return data;
  },
);

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
        state.artistsLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.artistsLoading = false;
      })
      .addCase(createArtist.pending, (state) => {
        state.artistsLoading = true;
      })
      .addCase(createArtist.fulfilled, (state, action) => {
        state.artists = [...state.artists, action.payload];
        state.artistsLoading = false;
      })
      .addCase(deleteArtist.pending, (state) => {
        state.artistsLoading = true;
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.artists = state.artists.filter(
          (artist) => artist.id !== action.payload.id,
        );
      })
      .addCase(publishArtist.pending, (state) => {
        state.artistsLoading = true;
      })
      .addCase(publishArtist.fulfilled, (state, action) => {
        state.artists = state.artists.map((artist) => {
          if (artist.id === action.payload.id) {
            return {
              ...artist,
              isPublish: true,
            };
          }
          return artist;
        });
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
