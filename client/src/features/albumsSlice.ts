import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IAlbum } from '@/interfaces/IAlbum';

interface State {
  albums: IAlbum[];
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  albums: [],
};

export const fetchAlbums = createAsyncThunk(
  'fetch/albums',
  async (artistId: string) => {
    const { data } = await axiosApiClient.get<IAlbum[]>(
      `/albums?artist=${artistId}`,
    );
    return data;
  },
);

export const createAlbum = createAsyncThunk(
  'create/album',
  async (payload: FormData) => {
    try {
      const { data } = await axiosApiClient.post('/albums', payload);
      return data;
    } catch (e) {
      const error = e as AxiosError<{ error: string; message: [string] }>;
      if (error.response?.data?.error) {
        return error.response.data.message;
      }
    }
  },
);

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.loading = false;
      })
      .addCase(createAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.albums = [...state.albums, action.payload];
        state.loading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
