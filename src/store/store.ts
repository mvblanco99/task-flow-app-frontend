import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/store/authSlice';
import taskReducer from '../modules/tasks/store/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks:taskReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;