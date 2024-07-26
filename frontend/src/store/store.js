import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import meetingReducer from './slices/meetingSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    meetings: meetingReducer,
  },
});

export default store;
