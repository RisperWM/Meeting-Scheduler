import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchMeetings = createAsyncThunk('meetings/fetchMeetings', async (_, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get('http://localhost:3000/api/meetings', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const addMeeting = createAsyncThunk('meetings/addMeeting', async (meetingData, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post('http://localhost:3000/api/meetings', meetingData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const editMeeting = createAsyncThunk('meetings/editMeeting', async ({ id, meetingData }, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.put(`http://localhost:3000/api/meetings/${id}`, meetingData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const deleteMeeting = createAsyncThunk('meetings/deleteMeeting', async (id, { rejectWithValue }) => {
  try {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('No token found');
    }
    await axios.delete(`http://localhost:3000/api/meetings/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, 
    });
    console.log(id)
    return id;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

const meetingSlice = createSlice({
  name: 'meetings',
  initialState: {
    meetings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meetings = action.payload;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addMeeting.fulfilled, (state, action) => {
        state.meetings.push(action.payload);
      })
      .addCase(addMeeting.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(editMeeting.fulfilled, (state, action) => {
        const index = state.meetings.findIndex((meeting) => meeting.id === action.payload.id);
        if (index !== -1) {
          state.meetings[index] = action.payload;
        }
      })
      .addCase(editMeeting.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMeeting.fulfilled, (state, action) => {
        state.meetings = state.meetings.filter((meeting) => meeting.id !== action.payload);
      })
      .addCase(deleteMeeting.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default meetingSlice.reducer;
