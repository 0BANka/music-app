import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IComment } from '@/interfaces/IComment';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface State {
  comments: IComment[];
  error?: Error;
  loading: boolean;
}

const initialState: State = {
  loading: false,
  comments: [],
};

export const fetchComments = createAsyncThunk(
  'fetch/comments',
  async (newsId: string) => {
    const { data } = await axiosApiClient.get<IComment[]>(
      `/comments?news_id=${newsId}`,
    );
    return data;
  },
);

export const deleteComment = createAsyncThunk(
  'delete/comment',
  async (id: string) => {
    const { data } = await axiosApiClient.delete(`/comments/${id}`);
    return data;
  },
);

export const createComment = createAsyncThunk(
  'create/comment',
  async (payload: Omit<IComment, 'id'>) => {
    try {
      const { data } = await axiosApiClient.post('/comments', payload);
      return data;
    } catch (e) {
      const error = e as AxiosError<{ error: string; message: [string] }>;
      if (error.response?.data?.error) {
        return error.response.data.message;
      }
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.loading = false;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (item) => item.id !== action.payload.id,
        );
        state.loading = false;
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
