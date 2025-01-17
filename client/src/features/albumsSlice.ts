import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IAlbum } from '@/interfaces/IAlbum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  albums: IAlbum[];
  selectedAlbum: IAlbum;
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  albums: [],
  selectedAlbum: {
    id: '',
    name: '',
    year: '',
    numberOfTracks: 0,
    image: '',
    artist: {
      id: '',
      name: '',
    },
  },
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
  reducers: {
    clearSelectedAlbum: (state) => {
      state.selectedAlbum = {
        id: '',
        name: '',
        year: '',
        numberOfTracks: 0,
        image: '',
        artist: {
          id: '',
          name: '',
        },
      };
    },
  },
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
export const { clearSelectedAlbum } = albumsSlice.actions;
