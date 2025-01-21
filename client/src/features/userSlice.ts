import { axiosApiClient } from '@/helpers/axiosApiClient';
import { IUser } from '@/interfaces/IUser';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface UserState {
  user?: IUser;
  loading?: boolean;
  registerError?: string;
  loginError?: string;
}

export interface UserRequest {
  username: string;
  password: string;
}

interface UserResponseError {
  message: string;
  error: string;
  statusCode: number;
}

export const registerUser = createAsyncThunk<IUser, UserRequest>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiClient.post<IUser>('/users', userData);
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data) {
          const errorResponse: UserResponseError = err.response.data;
          return rejectWithValue(errorResponse.message);
        }
        return rejectWithValue('An error occurred: ');
      }
      throw err;
    }
  },
);

export const loginUser = createAsyncThunk<IUser, UserRequest>(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiClient.post<IUser>(
        '/users/sessions',
        userData,
      );
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data) {
          const errorResponse: UserResponseError = err.response.data;
          return rejectWithValue(errorResponse.message);
        }
        return rejectWithValue('An error occurred: ');
      }
      throw err;
    }
  },
);

const initialState: UserState = {
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.registerError = undefined;
      state.loginError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.registerError = action.payload;
        } else {
          state.registerError = 'Something went wrong';
        }
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (typeof action.payload === 'string') {
          state.loginError = action.payload;
        } else {
          state.loginError = 'Something went wrong';
        }
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;

export const { clearErrors } = userSlice.actions;
