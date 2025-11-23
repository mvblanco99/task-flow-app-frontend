import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { tasksApi } from '../api/tasksApi';
import type { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from '../types';
import type { ApiError } from '../../common/interfaces/apiErrorInterfaces';

interface TasksState {
  items: Task[];
  filterStatus: 'all' | TaskStatus;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  filterStatus: 'all',
  status: 'idle',
  error: null,
};

// Thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (status: string | undefined, { rejectWithValue }) => {
    try {
      return await tasksApi.getAll(status);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: CreateTaskDto, { rejectWithValue }) => {
    try {
      return await tasksApi.create(task);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }: { id: string; data: UpdateTaskDto }, { rejectWithValue }) => {
    try {
      return await tasksApi.update(id, data);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await tasksApi.delete(id);
      return id;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data?.message || 'Failed to delete task');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TasksState['filterStatus']>) => {
      state.filterStatus = action.payload;
    },
    clearTasksError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch Tasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    // Create Task
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });

    // Update Task
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });

    // Delete Task
    builder
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task._id !== action.payload);
      });
  },
});

export const { setFilter, clearTasksError } = tasksSlice.actions;
export default tasksSlice.reducer;