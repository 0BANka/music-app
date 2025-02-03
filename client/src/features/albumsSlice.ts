import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IAlbum } from '@/interfaces/IAlbum';

interface State {
  albums: IAlbum[];
  error?: Error;
  albumsLoading: boolean;
}

const initialState: State = {
  albumsLoading: false,
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

export const deleteAlbum = createAsyncThunk(
  'delete/album',
  async (albumId: string) => {
    const { data } = await axiosApiClient.delete(`/albums/${albumId}`);
    return data;
  },
);

export const publishAlbum = createAsyncThunk(
  'publish/album',
  async (albumId: string) => {
    const { data } = await axiosApiClient.delete(`/albums/${albumId}/publish`);
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
        state.albumsLoading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.albumsLoading = false;
      })
      .addCase(createAlbum.pending, (state) => {
        state.albumsLoading = true;
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.albums = [...state.albums, action.payload];
        state.albumsLoading = false;
      })
      .addCase(deleteAlbum.pending, (state) => {
        state.albumsLoading = true;
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter(
          (album) => album.id !== action.payload.id,
        );
      })
      .addCase(publishAlbum.pending, (state) => {
        state.albumsLoading = true;
      })
      .addCase(publishAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.map((album) => {
          if (album.id === action.payload.id) {
            return {
              ...album,
              isPublish: true,
            };
          }
          return album;
        });
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
