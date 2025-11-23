import api from '../../../api/axios';
import type { Task, CreateTaskDto, UpdateTaskDto } from '../types';

export const tasksApi = {
  getAll: async (status?: string) => {
    const params = status && status !== 'all' ? { status } : {};
    const response = await api.get<Task[]>('/tasks', { params });
    return response.data;
  },
  create: async (task: CreateTaskDto) => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },
  update: async (id: string, task: UpdateTaskDto) => {
    const response = await api.patch<Task>(`/tasks/${id}`, task);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};
