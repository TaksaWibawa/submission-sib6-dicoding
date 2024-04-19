import { AxiosError } from 'axios';
import { axiosInstance } from '@/configs';

export const APIAuth = {
  login: async (data) => {
    try {
      const response = await axiosInstance.post('/login', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },

  register: async (data) => {
    try {
      const response = await axiosInstance.post('/register', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },
};
