import { AxiosError } from 'axios';
import { axiosInstance } from '@/configs';

export const APIUsers = {
  getUsers: async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },
};
