import api from '../../../api/axios';
import type { LoginUserDto, RegisterUserDto, User } from '../types/types';

export const authApi = {
  login: async (credentials: LoginUserDto) => {
    const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
    return response.data;
  },
  register: async (userData: RegisterUserDto) => {
    const response = await api.post<{ user: User; token: string }>('/auth/register', userData);
    return response.data;
  },
  checkStatus: async () => {
    const response = await api.get<User>('/auth/check-status');
    return response.data;
  },
};
