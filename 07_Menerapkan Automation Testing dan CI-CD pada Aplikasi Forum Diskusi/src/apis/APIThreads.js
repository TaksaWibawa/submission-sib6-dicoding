import { AxiosError } from 'axios';
import { axiosInstance } from '@/configs';

export const VOTE_OPTIONS = {
  UP_VOTE: 'up-vote',
  DOWN_VOTE: 'down-vote',
  NEUTRAL_VOTE: 'neutral-vote',
};

export const APIThreads = {
  getThreads: async () => {
    try {
      const response = await axiosInstance.get('/threads');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },

  getDetailThread: async (id) => {
    try {
      const response = await axiosInstance.get(`/threads/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },

  createThread: async (data) => {
    try {
      const response = await axiosInstance.post('/threads', data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },

  createComment: async ({ threadId, content }) => {
    try {
      const response = await axiosInstance.post(`/threads/${threadId}/comments`, { content });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },

  setVoteThread: async ({ threadId, vote }) => {
    if (!Object.values(VOTE_OPTIONS).includes(vote)) {
      throw new Error('Invalid vote value');
    }

    try {
      const response = await axiosInstance.post(`/threads/${threadId}/${vote}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },

  setVoteComment: async ({ threadId, commentId, vote }) => {
    if (!Object.values(VOTE_OPTIONS).includes(vote)) {
      throw new Error('Invalid vote value');
    }

    try {
      const response = await axiosInstance.post(
        `/threads/${threadId}/comments/${commentId}/${vote}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) throw new Error(error.response?.data.message);
      throw new Error(error.message);
    }
  },
};
