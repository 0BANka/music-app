import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IEntityData } from '@/interfaces/IEntityData';

interface State {
  entitiesData: IEntityData[];
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  entitiesData: [],
};

export const fetchEntities = createAsyncThunk('fetch/entities', async () => {
  const { data } = await axiosApiClient.get<IEntityData[]>(
    '/admin/entities-data',
  );
  return data;
});

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.entitiesData = action.payload;
        state.loading = false;
      });
  },
});

export const entitiesReducer = entitiesSlice.reducer;
