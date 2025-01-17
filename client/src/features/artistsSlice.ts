import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IArtist } from '@/interfaces/IArtist';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface State {
  artists: IArtist[];
  selectedArtist: IArtist;
  error?: Error;
  loading: boolean;
  imageName: string;
}

const initialState: State = {
  loading: false,
  artists: [],
  selectedArtist: {
    id: '',
    name: '',
    photo: '',
  },
  imageName: '',
};

export const fetchArtists = createAsyncThunk('fetch/artists', async () => {
  const { data } = await axiosApiClient.get<IArtist[]>('/artists');
  return data;
});

// export const fetchPostById = createAsyncThunk(
//   'fetch/postById',
//   async (id: string) => {
//     const { data } = await axiosApiClient.get<IArtist>(`/news/${id}`);
//     return data;
//   },
// );

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setImageName: (state, action) => {
      state.imageName = action.payload;
    },
    clearSelectedArtist: (state) => {
      state.selectedArtist = {
        id: '',
        name: '',
        photo: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.loading = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const { setImageName, clearSelectedArtist } = artistsSlice.actions;
