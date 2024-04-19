import { axiosInstance } from '@/configs';
import { AxiosError } from 'axios';

export const APILeaderboards = {
  getLeaderboards: async () => {
    try {
      const response = await axiosInstance.get('/leaderboards');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },
};
