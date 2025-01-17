import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
