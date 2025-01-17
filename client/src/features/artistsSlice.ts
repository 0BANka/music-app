import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IPost } from '@/interfaces/IPost';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface State {
  posts: IPost[];
  selectedPost: IPost;
  error?: Error;
  loading: boolean;
  imageName: string;
}

const initialState: State = {
  loading: false,
  posts: [],
  selectedPost: {
    id: '',
    title: '',
    content: '',
    image: '',
    datePublished: '',
  },
  imageName: '',
};

export const fetchPosts = createAsyncThunk('fetch/posts', async () => {
  const { data } = await axiosApiClient.get<IPost[]>('/news');
  return data;
});

export const fetchPostById = createAsyncThunk(
  'fetch/postById',
  async (id: string) => {
    const { data } = await axiosApiClient.get<IPost>(`/news/${id}`);
    return data;
  },
);

export const deletePost = createAsyncThunk(
  'delete/post',
  async (id: string) => {
    const { data } = await axiosApiClient.delete(`/news/${id}`);
    return data;
  },
);

export const createPost = createAsyncThunk(
  'create/post',
  async (payload: FormData) => {
    try {
      const { data } = await axiosApiClient.post('/news', payload);
      return data;
    } catch (e) {
      const error = e as AxiosError<{ error: string; message: [string] }>;
      if (error.response?.data?.error) {
        return error.response.data.message;
      }
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setImageName: (state, action) => {
      state.imageName = action.payload;
    },
    clearSelectedPost: (state) => {
      state.selectedPost = {
        id: '',
        title: '',
        content: '',
        image: '',
        datePublished: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
        state.loading = false;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload];
        state.loading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (item) => item.id !== action.payload.id,
        );
        state.loading = false;
      });
  },
});

export const postsReducer = postsSlice.reducer;
export const { setImageName, clearSelectedPost } = postsSlice.actions;
