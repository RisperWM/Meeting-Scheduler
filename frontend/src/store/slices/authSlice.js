import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; 

const initialState = {
  token: Cookies.get('token')|| null,
  userId: Cookies.get('userId') || null,
  user: null,
  status: 'idle',
  error: null,
};

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', { email, password });
      console.log(response)
      const { token, userId } = response.data;
      return { token, userId };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      const { token, userId } = response.data;
      return { token, userId };
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.user = null;
      Cookies.remove('token');
      Cookies.remove('userId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        Cookies.set('token', action.payload.token, {expires: 1, sameSite: 'None', secure: true });
        Cookies.set('userId', action.payload.userId, {expires: 1, sameSite: 'None', secure: true });
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        Cookies.set('token', action.payload.token, {expires: 1, sameSite: 'None', secure: true });
        Cookies.set('userId', action.payload.userId, {expires: 1, sameSite: 'None', secure: true });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
